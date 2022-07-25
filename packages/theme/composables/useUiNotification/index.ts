import { computed, reactive } from '@nuxtjs/composition-api';

interface UiNotification {
  message: string;
  action: { text: string; onClick: (...args: any) => void };
  type: 'danger' | 'success' | 'info';
  icon: string;
  persist: boolean;
  id: symbol;
  dismiss: () => void;
}

interface Notifications {
  notifications: Array<UiNotification>;
}

const state = reactive<Notifications>({
  notifications: []
});
const maxVisibleNotifications = 5;
const timeToLive = 5000;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUiNotification = () => {
  const send = (notification: UiNotification) => {
    const id = Symbol();

    const dismiss = () => {
      const index = state.notifications.findIndex(notification => notification.id === id);

      if (index !== -1) state.notifications.splice(index, 1);
    };


    const newNotification = {
      ...notification,
      id,
      dismiss
    };
    // TODO: Figure out why the notifications are one message behind except the first one
    console.log('useUiNotification notification: ' + JSON.stringify(notification));
    console.log('useUiNotification newNotification: ' + JSON.stringify(newNotification));

    console.log('useUiNotification before state.notifications: ' + JSON.stringify(state.notifications));
    state.notifications.push(newNotification);
    console.log('useUiNotification after state.notifications: ' + JSON.stringify(state.notifications));
    if (state.notifications.length > maxVisibleNotifications) state.notifications.shift();

    if (!notification.persist) {
      setTimeout(dismiss, timeToLive);
    }
  };

  return {
    send,
    notifications: computed(() => state.notifications)
  };
};

export default useUiNotification;
