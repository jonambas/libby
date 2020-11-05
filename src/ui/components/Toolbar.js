import React from 'react';
import Box from '@sweatpants/box';
import Inline from '@sweatpants/inline';
import ScreenReaderOnly from '@sweatpants/screenreaderonly';
import useWindow from '../hooks/useWindow';
import BackgroundContext from '../context/BackgroundContext';
import Open from './icons/Open';
import Expand from './icons/Expand';
import Image from './icons/Image';
import Button from './Button';

function IconWrapper(props) {
  return (
    <Box pl="200" py="100" position="relative" top="2px" color="black">
      {props.children}
    </Box>
  );
}

function Toolbar(props) {
  const { toggleSidebar } = props;
  const { cycle } = React.useContext(BackgroundContext);
  const environment = useWindow();
  const href = `${environment?.location?.origin}/iframe.html${environment?.location?.search}`;

  return (
    <Inline space="100">
      <Button onClick={cycle}>
        <IconWrapper>
          <Image />
          <ScreenReaderOnly>Cycle backgrond color</ScreenReaderOnly>
        </IconWrapper>
      </Button>

      <Button onClick={toggleSidebar}>
        <IconWrapper>
          <Expand />
          <ScreenReaderOnly>Toggle full screen</ScreenReaderOnly>
        </IconWrapper>
      </Button>

      <Button as="a" target="_blank" href={href} rel="noopener noreferrer">
        <IconWrapper>
          <Open />
          <ScreenReaderOnly>Open iframe in new tab</ScreenReaderOnly>
        </IconWrapper>
      </Button>
    </Inline>
  );
}

export default Toolbar;
