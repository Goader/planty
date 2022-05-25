import {useCallback} from "react";
import {AccountSettings, AccountSettingsData} from "../model/settings";
import {useAuth} from "./auth/AuthContext";

const settingsUrl = 'http://localhost:3001/settings/';

export function useSettingsService() {
    const {request} = useAuth();
    const getSettings = useCallback(() => {
        return request<AccountSettingsData>({
            method: 'get',
            url: settingsUrl
        }).then(response => ({
            accountNotifications: response.account_notifications,
            waterNotifications: response.watering_notifications,
            forumNotifications: response.forum_notifications,
        } as AccountSettings));
    }, [request]);

    const saveSettings = useCallback((settings: AccountSettings) => {
        return request<AccountSettingsData>({
            method: 'put',
            url: settingsUrl,
            data: ({
                account_notifications: settings.accountNotifications,
                watering_notifications: settings.waterNotifications,
                forum_notifications: settings.forumNotifications
            } as AccountSettingsData)
        }).then(() => {
        });
    }, [request]);

    return {getSettings, saveSettings};
}
