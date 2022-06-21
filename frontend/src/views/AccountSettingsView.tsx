import {Card, Container} from "react-bootstrap";
import AccountSettingsForm from "../components/AccountSettingsForm";


function AccountSettingsView() {
    return (
        <Container>
            <h2>Options</h2>
            <Card className={'form-card p-5 mx-auto'}>
                <AccountSettingsForm/>
            </Card>
        </Container>
    );
}

export default AccountSettingsView;