import React, { useState } from 'react';

function SubnetCalculator() {
  const [ipAddress, setIpAddress] = useState('');
  const [prefixLength, setPrefixLength] = useState('');
  const [subnetAddress, setSubnetAddress] = useState('');
  const [subnetMask, setSubnetMask] = useState('');
  const [numHosts, setNumHosts] = useState('');
  const [networkAddress, setNetworkAddress] = useState('');
  const [ipRangeStart, setIpRangeStart] = useState('');
  const [ipRangeEnd, setIpRangeEnd] = useState('');

  const calculateSubnet = () => {
    // Split the IP address into its 8 16-bit segments
    const segments = ipAddress.split(':');

    // Convert each segment to a binary string and pad with zeroes to 16 bits
    const binarySegments = segments.map(segment =>
      parseInt(segment, 16).toString(2).padStart(16, '0')
    );

    // Join the binary segments into a single string
    const binaryAddress = binarySegments.join('');

    // Calculate the subnet mask based on the prefix length
    const binaryMask = '1'.repeat(prefixLength) + '0'.repeat(128 - prefixLength);

    // Convert the binary mask back to a colon-separated IPv6 address
    const maskSegments = binaryMask.match(/.{1,16}/g);
    const hexMaskSegments = maskSegments.map(segment =>
      parseInt(segment, 2).toString(16).padStart(4, '0')
    );
    const subnetMask = hexMaskSegments.join(':');

    // Calculate the subnet address by applying the mask to the IP address
    const binarySubnet = binaryAddress.substring(0, prefixLength) + '0'.repeat(128 - prefixLength);
    const subnetSegments = binarySubnet.match(/.{1,16}/g);
    const hexSubnetSegments = subnetSegments.map(segment =>
      parseInt(segment, 2).toString(16).padStart(4, '0')
    );
    const subnetAddress = hexSubnetSegments.join(':');

    // Calculate the number of hosts in the subnet
    const numHosts = Math.pow(2, 128 - prefixLength) - 2;

    // Calculate the network address by ANDing the subnet address with the subnet mask
    const networkBinary = binarySubnet.substring(0, prefixLength) + '0'.repeat(128 - prefixLength);
    const networkSegments = networkBinary.match(/.{1,16}/g);
    const hexNetworkSegments = networkSegments.map(segment =>
      parseInt(segment, 2).toString(16).padStart(4, '0')
    );
    const networkAddress = hexNetworkSegments.join(':');

    // Calculate the IP range for the subnet
    const ipRangeStartBinary = networkBinary.substring(0, 128 - prefixLength) + '1'.repeat(prefixLength);
    const ipRangeEndBinary = networkBinary.substring(0, 128 - prefixLength) + '1'.repeat(prefixLength - 1) + '0';
    const ipRangeStartSegments = ipRangeStartBinary.match(/.{1,16}/g);
    const hexIpRangeStartSegments = ipRangeStartSegments.map(segment =>
      parseInt(segment, 2).toString(16).padStart(4, '0')
    );
    const ipRangeStart = hexIpRangeStartSegments.join(':');
    const ipRangeEndSegments = ipRangeEndBinary.match(/.{1,16}/g);
    const hexIpRangeEndSegments = ipRangeEndSegments.map(segment =>
      parseInt(segment, 2).toString(16).padStart(4, '0')
    );
    const ipRangeEnd = hexIpRangeEndSegments.join(':');

    // Update the state with the calculated values
    setSubnetAddress(subnetAddress);
    setSubnetMask(subnetMask);
    setNumHosts(numHosts);
    setNetworkAddress(networkAddress);
    setIpRangeStart(ipRangeStart);
    setIpRangeEnd(ipRangeEnd);
  };

  return (
    <div className='container'>
      <label>
        IPv6 address:
        <input type="text" value={ipAddress} onChange={e => setIpAddress(e.target.value)} />
      </label>
      <br />
      <label>
        Prefix length:
        <input type="text" value={prefixLength} onChange={e => setPrefixLength(e.target.value)} />
      </label>
      <br />
      <button onClick={calculateSubnet}>Calculate subnet</button>
      <br />
      <br />
      <div>
        Subnet address: {subnetAddress}
      </div>
      <div>
        Subnet mask: {subnetMask}
      </div>
      <div>
        Number of hosts: {numHosts}
      </div>
      <div>
        Network address: {networkAddress}
      </div>
      <div>
        IP range: {ipRangeStart} - {ipRangeEnd}
      </div>
    </div>
  );
}

export default SubnetCalculator;