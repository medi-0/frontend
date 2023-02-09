import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import QrPanel from "./QrPanel";
import { UploadPanel } from "./UploadPanel";
import { UploadPanelCopy } from "./UploadPanel copy";



export default function TabModal() {
  return (
    <div>
      <Tabs isLazy>
        <TabList>
          <Tab>Scan Qr Code</Tab>
          <Tab>Upload FIle</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <QrPanel/>

          </TabPanel>
          <TabPanel>
            <UploadPanelCopy/>

          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
