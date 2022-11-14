import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMeetManagerProps {
  context: WebPartContext;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  listGuid: string;
}
