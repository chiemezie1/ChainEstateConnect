
import { useWeb3Modal } from '@web3modal/wagmi/react';

export default function ConnectBootOne() {
  const { open, close } = useWeb3Modal();


  return (
    
    <div>
      <button onClick={() => open()}>Open Modal</button>
    </div>
  );
}
