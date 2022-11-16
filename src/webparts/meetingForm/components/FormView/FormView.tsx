import * as React from "react";

import GroupsView from "../GroupsView/GroupsView";

import {
  updateGroup,
  createGroup,
  getAllGroups,
} from "../../services/GroupService";
import { Button, Checkbox, Form } from "semantic-ui-react";

function FormView(): React.ReactElement {
  return (
    <>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder="Last Name" />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}
export default FormView;
