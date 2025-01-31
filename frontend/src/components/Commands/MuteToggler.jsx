import React from 'react';
import useIsMobile from "../../hooks/useIsMobile";
import WebMuteToggler from "./WebMuteToggler";
import MobileMuteToggler from "./MobileMuteToggler";

const MuteToggler = ({ audioRef }) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && <MobileMuteToggler audioRef={audioRef} />}
      {!isMobile && <WebMuteToggler audioRef={audioRef} />}
    </>
  );
};

export default MuteToggler;
