import { useEffect, useState } from 'react';
import close from '../assets/icons/close.svg';
import close_black from '../assets/icons/close_black.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MetaMask from '../assets/icons/metamask.svg';
import walletConnect from '../assets/icons/walletconnect.png';
import defaultFallback from '../assets/icons/web.svg';
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi';
import { useTranslation } from 'react-i18next';
import ClickAwayListener from 'react-click-away-listener';
import { useAppKit } from '@reown/appkit/react';

const WalletConnectModal = ({
  updateIsWalletConnectVisible,
}: {
  updateIsWalletConnectVisible: (value: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { open } = useAppKit();
  const { connect, connectors } = useConnect();
  const { connector: WagmiConnector } = useAccount();
  const { disconnect: EVMDisconnect } = useDisconnect();
  const [selectedTab, setSelectedTab] = useState(0);
  const [supportingConnectors, setSupportingConnectors] = useState<Connector[]>(
    []
  );
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleTabSelect = (index: any) => {
    setSelectedTab(index);
  };

  const tabClasses = `flex xxl:w-full bxl:w-full xl:w-full sxl:w-full lg:w-full md:w-full sm:w-full max-sm:w-[21rem] h-12 cursor-pointer transition-all ease-in-out duration-500 ${
    isDarkMode
      ? 'bg-[#eff7f8]'
      : 'bg-gradient-to-r from-[#f5fffa0f] to-[#F5F7FA00] border-b-2 border-b-[#313337]'
  }`;
  const panelClasses = ` w-full xxl:h-[60%] bxl:h-[60%] xl:h-[60%] sxl:h-[50%] lg:h-[50%] md:h-[50%] sm:h-[50%] xd:h-[50%] bg-${
    isDarkMode
      ? 'bg-[#0f1012]'
      : 'gradient-to-r from-[#f5fffa0f] to-[#F5F7FA00] rounded-b-[1rem] '
  }   `;

  const handleConnect = async (connector: any) => {
    await connect({ connector });
    updateIsWalletConnectVisible(false);
  };

  const handleClickAway = () => {
    updateIsWalletConnectVisible(false);
  };

  useEffect(() => {
    if (connectors) {
      // if connector name is MeataMask then add to list and if connector name is WalletConnect then add to list
      const supportedConnectors = connectors.filter(
        (connector) =>
          connector.name === 'MetaMask' || connector.name === 'WalletConnect'
      );
      // need to remove same name connectors
      const uniqueConnectors = supportedConnectors.filter(
        (v, i, a) => a.findIndex((t) => t.name === v.name) === i
      );

      setSupportingConnectors(uniqueConnectors);
    }
  }, [connectors]);

  return (
    <div className="fixed z-[4] gap-4 inset-0 h-full w-full bg-[rgba(0,0,0,0.20)] backdrop-blur-[54px] flex flex-col justify-center  items-center">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div
          className={`xxl:w-[40%] bxl:w-[40%] xl:w-[40%] sxl:w-[40%] lg:w-[40%] md:w-[60%] sm:w-[95%] xd:w-[95%]  ${
            isDarkMode
              ? 'bg-[#FFFFFF] border-[#DAECEF]'
              : 'bg-gradient-to-r from-[#f5fffa0f] to-[#F5F7FA00] border-[#1e1f22] backdrop-blur-[54.36563491821289px]'
          } border-2 rounded-2xl`}
        >
          <div className="flex justify-between p-[3%_5%] connect_bg_container  rounded-t-[1rem]  w-full">
            <div
              className={`${
                isDarkMode ? 'text-[#364152]' : 'text-white'
              } font-[500] text-[1.25rem]`}
            >
              {t('connect_wallet')}
            </div>
            <img
              src={isDarkMode ? close_black : close}
              alt="close"
              className="cursor-pointer"
              onClick={() => {
                updateIsWalletConnectVisible(false);
              }}
            />
          </div>
          <div className="flex justify-center  w-full  ">
            <Tabs className="w-full">
              <TabList className={tabClasses}>
                <Tab
                  className={`${
                    isDarkMode ? 'text-[#364152]' : 'text-white'
                  } py-3 outline-none Tab_container px-8 ${
                    selectedTab === 0 ? 'selected-tab' : ''
                  }`}
                  onClick={() => handleTabSelect(0)}
                >
                  {t('web3_wallets')}
                </Tab>
              </TabList>
              <TabPanel className="w-full">
                <div className={panelClasses}>
                  <ul className="flex flex-col overflow-y-scroll !h-[21.5rem]">
                    {supportingConnectors &&
                      supportingConnectors.map((connector, index) => {
                        return (
                          <div
                            className={` ${
                              isDarkMode ? 'text-black' : 'text-white'
                            } flex items-center py-7 px-10 my-1 rounded-2xl cursor-pointer hover:bg-[#00000033]`}
                            onClick={
                              connector.name === 'WalletConnect'
                                ? () => {
                                    handleClickAway();
                                    open();
                                  }
                                : () => {
                                    handleConnect(connector);
                                  }
                            }
                            key={index}
                          >
                            {connector.name === 'MetaMask' ? (
                              <img
                                className="w-6 h-6"
                                src={MetaMask}
                                alt="token"
                              />
                            ) : connector.name === 'WalletConnect' ? (
                              <img
                                className="w-6 h-6"
                                src={walletConnect}
                                alt="token"
                              />
                            ) : (
                              <img
                                className="w-6 h-6"
                                src={defaultFallback}
                                alt="token"
                              />
                            )}
                            <div className="font-inter font-bold leading-5 pl-4">
                              <div className="text-lg ">{connector.name}</div>
                            </div>
                            {WagmiConnector?.id === connector.id && (
                              <div
                                className="flex-1 text-right text-greyText"
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  EVMDisconnect();
                                }}
                              >
                                {t('disconnect')}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </ul>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </ClickAwayListener>
      {/* )} */}
    </div>
  );
};

export default WalletConnectModal;
