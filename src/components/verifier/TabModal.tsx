import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import QrPanel from "./QrPanel";
import { UploadPanel } from "./UploadPanel";



export default function TabModal() {
  return (
    <div>
      <Tabs isLazy>
        <TabList>
          <Tab className="font-bold">Scan Qr Code</Tab>
          <Tab className="font-bold">Upload FIle</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <QrPanel/>

          </TabPanel>
          <TabPanel>
            <UploadPanel/>

          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
