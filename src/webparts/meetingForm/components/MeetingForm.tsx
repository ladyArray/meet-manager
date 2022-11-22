import * as React from "react";
import styles from "./MeetingForm.module.scss";
import IndexView from "./IndexView/IndexView";
import getSectors from "../services/SectorService";
import { ISectorData } from "../models/ISectorData";
import GroupsView from "./GroupsView/GroupsView";
import { IMeetingFormProps } from "../components/IMeetingFormProps";
import FormView from "./FormView/FormView";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

export const SPContext = React.createContext(null);

export default function MeetingForm(props: IMeetingFormProps): JSX.Element {
  const [sectors, setSector] = React.useState<ISectorData[]>([]);

  React.useEffect(() => {
    getSectors().then(setSector).catch(console.error);
  }, []);
  const value = { context: props.context };
  return (
    <>
      <SPContext.Provider value={value}>
        <Router>
          <Routes>
            <Route element={<IndexView />}>
              <Route path="/" element={<GroupsView />} />
              <Route path="/editGroup/:id" element={<FormView />} />
            </Route>
          </Routes>
        </Router>
      </SPContext.Provider>
    </>
  );
}
