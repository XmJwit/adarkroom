import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNotificationStore } from '../../stores/notificationStore';
import './Notifications.css';

/**
 * 通知项目组件
 */
const NotificationItem = ({ notification, onRemove }) => {
  const { id, message, type } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div className={`notification notification-${type}`}>
      {message}
    </div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string
  }).isRequired,
  onRemove: PropTypes.func.isRequired
};

/**
 * 通知容器组件
 */
const Notifications = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  return (
    <div id="notifications" className="notifications">
      <div id="notifyGradient" className="notify-gradient" />
      <div className="notifications-list">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
