import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Image from "../Image";
import ConnectWalletButton from "../WalletConnect/ConnectWalletButton";

const Headers = () => {
  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="Nftology"
          />
        </Link>
        
        <ConnectWalletButton />
      
      </div>
    </header>
  );
};

export default Headers;
