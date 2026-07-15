import React from 'react';
import Window from './Window';
import { useMacOS } from '../Adapter';

import Finder from '../apps/Finder';
import Notes from '../apps/Notes';
import Safari from '../apps/Safari';
import Mail from '../apps/Mail';
import SystemSettings from '../apps/SystemSettings';
import Calendar from '../apps/Calendar';
import Dictionary from '../apps/Dictionary';
import Certificates from '../apps/Certificates';

export default function WindowRenderer() {
  const { windows } = useMacOS();

  return (
    <>
      <Window id="certificates" title="Certificates" defaultWidth={800} defaultHeight={600}>
        <Certificates />
      </Window>
      <Window id="finder" title="Projects">
        <Finder />
      </Window>

      <Window id="notes" title="Notes" defaultWidth={700} defaultHeight={500}>
        <Notes />
      </Window>

      <Window id="safari" title="Safari" defaultWidth={1000} defaultHeight={700}>
        <Safari />
      </Window>

      <Window id="mail" title="Mail" defaultWidth={900} defaultHeight={600}>
        <Mail />
      </Window>

      <Window id="settings" title="System Settings" defaultWidth={800} defaultHeight={600}>
        <SystemSettings />
      </Window>

      <Window id="calendar" title="Calendar" defaultWidth={800} defaultHeight={600}>
        <Calendar />
      </Window>

      <Window id="dictionary" title="Dictionary" defaultWidth={700} defaultHeight={500}>
        <Dictionary />
      </Window>
    </>
  );
}
