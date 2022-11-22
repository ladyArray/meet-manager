import * as React from "react";
import { getAllGroups } from "../../services/GroupService";
import { IGroupData } from "../../models/IGroupData";
import MeetingForm from "../MeetingForm";
import {
  ITheme,
  mergeStyleSets,
  getTheme,
  getFocusStyle,
} from "@fluentui/react/lib/Styling";
import { Item } from "@pnp/sp/items";
import { Link } from "react-router-dom";
//const theme: ITheme = getTheme();
//const { palette, semanticColors, fonts } = theme;

const classNames = mergeStyleSets({
  itemCell: [
    //getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: "border-box",
      borderBottom: `1px solid`,
      display: "flex",
      selectors: {},
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: "hidden",
    flexGrow: 1,
  },
  itemName: [
    {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  ],
  itemIndex: {
    marginBottom: 10,
  },
});

function GroupsView(): React.ReactElement {
  const [groups, setGroups] = React.useState<IGroupData[]>([]);

  React.useEffect(() => {
    getAllGroups()
      .then((groups) => {
        setGroups(groups);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <section>
        <h1>Listado de grupos</h1>
        {groups.map((g) => (
          <Link key={g.ID} to={`/editGroup/${g.ID}`}>
            <div
              className={classNames.itemCell}
              data-is-focusable={true}
              key={g.ID}
            >
              <div className={classNames.itemContent}>
                <div className={classNames.itemName}>{g.Denomination}</div>
                <div className={classNames.itemName}>
                  {g.Topic}, {g.Type}
                </div>
                <div className={classNames.itemIndex}>
                  {g.City.term}, {g.Country.term}
                </div>
                <div className={classNames.itemName}>{g.SectorAssociated}</div>
                <div className={classNames.itemIndex}>
                  {g.CreationDate} - {g.CompletionDate}
                </div>

                <div className={classNames.itemIndex} />
                <div className={classNames.itemName}>{g.Description}</div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

export default GroupsView;
