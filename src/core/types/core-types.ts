export type Menu_Options = {
    path: string;
    label: string;
}

type NotiType = 'success' | 'error';

export type NotificactionData = {
    title: string;
    message: string;
    type: NotiType;
}
