import * as React from "react";

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "../../../pnpjsConfig";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import getGroups from "./GroupService";
import { Item } from "@pnp/sp/items";
import { SPFI } from "@pnp/sp";
import { useState } from "react";
import { IMeetingFormProps } from "../components/IMeetingFormProps";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IGroupData } from "../models/IGroupData";
import { IMeetManagerProps } from "../IMeetManagerProps";
import { ListItemAttachments } from "@pnp/spfx-controls-react";

const LIST_GROUPS = "a66f450c-4326-43b8-9fdf-9bdf47e0b820";
const LIST_SECTORS = "8CA011CD-2FD3-4D7E-A425-084C3A2CC900";
