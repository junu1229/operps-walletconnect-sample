import { notification, Tooltip } from 'antd';
import { useAccount, useDisconnect } from 'wagmi';

import MetaMask from '../assets/icons/metamask.svg';
import walletConnect from '../assets/icons/walletconnect.png';
import defaultFallback from '../assets/icons/web.svg';
import Copy from '../assets/icons/copy.svg';
import CopyDark from '../assets/icons/copy_dark.svg';
import Power from '../assets/icons/power.svg';
import UserCircle from '../assets/icons/user-circle.svg';
import UserCircleWhite from '../assets/icons/user-circle-white.svg';
import { useCallback, useState } from 'react';
import WalletConnectModal from './WalletConnectModal';

const Wallet = () => {
  const [isWalletConnectVisible, setIsWalletConnectVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { connector, address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const copyHash = useCallback(async (hash: any) => {
    await navigator.clipboard.writeText(hash);
  }, []);

  const tooltipStyle = {
    backgroundColor: isDarkMode ? '#fff' : '#000',
    color: isDarkMode ? '#000' : '#fff',
    backdropFilter: '1rem',
  };

  const notificationStyle = {
    backgroundColor: isDarkMode ? '#fff' : '#111213',
    color: isDarkMode ? '#0E9384' : '#0E9384',
  };

  return (
    <div
      className={`${
        isDarkMode
          ? '!bg-[#EFF7F8] hover:!bg-[#E4F2F3] text-[#0E9384]'
          : '!bg-[#1D1E20] hover:!bg-[#1f2122] text-[#2ED3B7]'
      } common-pointer flex flex-row justify-start items-center h-14 leading-[normal] py-4 px-6  rounded-2xl font-inter font-extrabold text-sm ${
        isConnected ? '' : 'cursor-pointer'
      }`}
      id="element-id-for-guide-9"
      onClick={() => {
        isConnected ? () => {} : setIsWalletConnectVisible(true);
      }}
    >
      {isConnected ? (
        <div
          className={`flex justify-between gap-2  items-center !w-full cursor-pointer`}
        >
          <div
            className=" flex"
            onClick={() => {
              setIsWalletConnectVisible(true);
            }}
          >
            <img
              className=" !w-[1.3rem] !h-[1.3rem]"
              src={
                connector?.name === 'MetaMask'
                  ? MetaMask
                  : connector?.name === 'WalletConnect'
                  ? walletConnect
                  : defaultFallback
              }
            />
            <div className=" p-1">
              {' '}
              {address?.slice(0, 5) + '..' + address?.toString()?.slice(-5)}
            </div>
          </div>
          <div className="flex">
            <Tooltip
              placement="bottom"
              title={'Copy Wallet Address'}
              arrow={false}
              overlayInnerStyle={tooltipStyle}
            >
              <img
                src={isDarkMode ? CopyDark : Copy}
                alt="Copy"
                onClick={() => {
                  copyHash(address);
                  notification.success({
                    message: 'Address Copied',
                    style: notificationStyle,
                  });
                }}
              />
            </Tooltip>
            <Tooltip
              placement="bottom"
              title={'Disconnect Wallet'}
              arrow={false}
              overlayInnerStyle={tooltipStyle}
            >
              <img
                src={Power}
                alt="Power "
                onClick={() => {
                  disconnect();
                }}
              />
            </Tooltip>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-row justify-start items-center gap-2 "
          onClick={() => {
            setIsWalletConnectVisible(true);
          }}
        >
          {isDarkMode ? (
            <img
              src={UserCircleWhite}
              alt="UserCircle"
              className="!bg-transparent"
            />
          ) : (
            <img
              src={UserCircle}
              alt="UserCircle"
              className="!bg-transparent"
            />
          )}
          Connect Wallet
        </div>
      )}
      {isWalletConnectVisible && (
        <WalletConnectModal
          updateIsWalletConnectVisible={setIsWalletConnectVisible}
        />
      )}
    </div>
  );
};

export default Wallet;
