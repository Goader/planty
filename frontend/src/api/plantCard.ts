import {useAuth} from "../components/AuthContext";
import {useCallback} from "react";

const settingsUrl = 'http://localhost:3001/dashboard/plants/';

export function useDeleteResponse() {
    const {request} = useAuth();
    const sendDeleteRequest = useCallback((id) => {
        return request({
            method: 'delete',
            url: settingsUrl,
            data: {
                id: id
            }
        }).then(response => {
            console.log(response);
        });
    }, [request]);

    return {sendDeleteRequest};
}