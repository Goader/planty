import {useAuth} from "../components/AuthContext";
import {useCallback} from "react";
import {AccountSettings, AccountSettingsData} from "../model/settings";

const settingsUrl = 'http://localhost:3001/settings/';

export function useSettingsService() {
    const {request} = useAuth();
    const getSettings = useCallback(() => {
        return request<AccountSettingsData>({
            method: 'get',
            url: settingsUrl
        }).then(response => ({
            accountNotifications: response.account_notifications,
            waterNotifications: response.water_notifications,
            forumNotifications: response.forum_notifications,
        } as AccountSettings))
    }, [request]);

    return {getSettings};
}