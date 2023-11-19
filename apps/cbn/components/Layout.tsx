import { useEffect, useMemo } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import Image from "next/image";
import { useBalancesStore, useObserveBalance } from "../lib/stores/balances";
import { useChainStore, usePollBlockHeight } from "../lib/stores/chain";
import { useClientStore } from "../lib/stores/client";
import { useNotifyTransactions, useWalletStore } from "../lib/stores/wallet";

// import { PrivateKey } from "o1js";
// console.log(PrivateKey.random().toBase58());

const Layout = (props: any) => {
  const wallet = useWalletStore();
  const client = useClientStore();
  const chain = useChainStore();
  const balances = useBalancesStore();

  usePollBlockHeight();
  useObserveBalance();
  useNotifyTransactions();

  useEffect(() => {
    client.start();
  }, []);

  useEffect(() => {
    wallet.initializeWallet();
    wallet.observeWalletChange();
  }, []);

  const balanceLoading = useMemo(
    () => client.loading || balances.loading,
    [client.loading, balances.loading]
  );

  const balance = balances.balances[wallet.wallet ?? ""];
  const onConnectWallet = wallet.connectWallet;
  useEffect(() => {
    if (wallet.wallet) {
      localStorage.setItem("walletAddr", wallet.wallet);
    }
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginY: "1em",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Image src="/cbn.png" alt="CDN" width={200} height={100} />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {wallet && (
          <Box>
            <Box>
              <Typography variant="caption">Your balance</Typography>
            </Box>
            <Box>
              {balanceLoading && balance === undefined ? (
                <Box>Skeleton</Box>
              ) : (
                <Typography variant="caption">{balance} MINA</Typography>
              )}
            </Box>
          </Box>
        )}
        {/* connect wallet */}
        <Button onClick={onConnectWallet}>
          {wallet.wallet ? (
            <Chip
              color="secondary"
              label={
                wallet.wallet?.slice(0, 7) + "..." + wallet.wallet?.slice(-7)
              }
            />
          ) : (
            <Typography>Connect wallet</Typography>
          )}
        </Button>

        <Button
          size="small"
          variant="contained"
          onClick={() => (window.location.href = `/api/auth/logout?returnTo=/`)}
        >
          Sign Out
        </Button>
      </Box>
      {props.children}
    </Box>
  );
};

export default Layout;
