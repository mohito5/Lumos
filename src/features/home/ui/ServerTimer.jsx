
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const servers = [
    {
        key: 'asia',
        nameKey: 'serverTimer.serverAsia',
        serverTimezone: 'Asia/Shanghai',
        resetHour: 4, 
        offset: '+08:00',
        color: 'var(--pyro)',
        region: 'asia',
        gmtOffset: 8
    },
    {
        key: 'europe',
        nameKey: 'serverTimer.serverEurope',
        serverTimezone: 'Europe/Berlin',
        resetHour: 4, 
        offset: '+01:00',
        color: 'var(--dendro)',
        region: 'europe',
        gmtOffset: 1
    },
    {
        key: 'america',
        nameKey: 'serverTimer.serverAmerica',
        serverTimezone: 'America/New_York',
        resetHour: 4, 
        offset: '-05:00',
        color: 'var(--electro)',
        region: 'america',
        gmtOffset: -5
    }
];

const getUserTimezoneInfo = () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const offsetMinutes = now.getTimezoneOffset();
    const offsetHours = -offsetMinutes / 60;
    const sign = offsetHours >= 0 ? '+' : '';
    const hours = Math.abs(Math.floor(offsetHours));
    const minutes = Math.abs(offsetMinutes % 60);
    const gmtString = `GMT${sign}${hours}${minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : ''}`;
    
    return {
      name: userTimezone,
      offset: offsetHours,
      gmt: gmtString,
    };
};

const calculateNextReset = (server) => {
    const now = new Date();
    const userOffset = -now.getTimezoneOffset() / 60;
    const timezoneDiff = userOffset - server.gmtOffset;
    let userResetHour = 4 + timezoneDiff;
    
    if (userResetHour < 0) userResetHour += 24;
    else if (userResetHour >= 24) userResetHour -= 24;
    
    const nextReset = new Date();
    nextReset.setHours(userResetHour, 0, 0, 0);
    
    if (nextReset.getTime() <= now.getTime()) {
      nextReset.setDate(nextReset.getDate() + 1);
    }
    
    return nextReset;
};

const getTimeLeft = (resetTime) => {
    const now = new Date();
    const diff = resetTime - now;

    if (diff <= 0) return { hours: 0, minutes: 0, totalMinutes: 0, seconds: 0 };

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    const totalMinutes = hours * 60 + minutes;

    return { hours, minutes, seconds, totalMinutes };
};

const ServerItem = ({ server, showServerTime }) => {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(calculateNextReset(server)));

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft(getTimeLeft(calculateNextReset(server)));
        }, 1000);

        return () => clearInterval(timerId);
    }, [server]);

    const { hours, minutes, totalMinutes, seconds } = timeLeft;
    const nextReset = calculateNextReset(server);
    const userTimezone = getUserTimezoneInfo();

    let resetTimeStr;
    let timezoneInfo = null;

    if (showServerTime) {
        resetTimeStr = '04:00';
    } else {
        resetTimeStr = nextReset.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        timezoneInfo = (
            <div className="timezone-calculation">
                <small>
                    04:00 GMT{server.offset} → {resetTimeStr} {userTimezone.gmt}
                </small>
            </div>
        );
    }

    let timeClass = 'time-left border p-1 radius-md background-r color-r';
    let progressClass = 'normal';
    if (totalMinutes < 60) { timeClass += ' warning'; progressClass = 'warning'; }
    if (totalMinutes < 30) { timeClass += ' urgent'; progressClass = 'urgent'; }

    const timeLeftText = t('serverTimer.timeLeft', { hours: String(hours).padStart(2, '0'), minutes: String(minutes).padStart(2, '0') });
    const totalCycleMinutes = 24 * 60;
    const percentage = ((totalCycleMinutes - totalMinutes - (seconds / 60)) / totalCycleMinutes) * 100;

    return (
        <div className="server-item p-3 radius-4 border gap-4">
            <div className="server border" style={{ backgroundColor: server.color }}></div>
            <div className="server-info gap-4 flex-c">
                <div className="server-header">
                    <div className="server-name"><h3>{t(server.nameKey)}</h3></div>
                    <div className="server-timezone p-1 border radius-2 color-r background-r"><h6>GMT{server.offset}</h6></div>
                </div>
                <div className="server-reset">
                    <h1>{resetTimeStr}</h1>
                    {timezoneInfo}
                </div>
                <div className={timeClass}>
                    <h5>{timeLeftText}</h5>
                </div>
                {totalMinutes < 30 && <span className="status-soon background-r border p-1">{t('serverTimer.soon')}</span>}
                <div className="server-progress">
                    <div className="progress-container flex-r gap-2 items-center">
                        <div className="progress-bar radius-2 border p-1">
                            <div className={`progress-fill p-1 ${progressClass}`} style={{ width: `${percentage}%` }}></div>
                        </div>
                        <div className={`progress-percentage border radius-md hd ${progressClass}`}>
                            <span>{Math.min(100, Math.max(0, Math.round(percentage * 10) / 10))}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ServerTimer = () => {
    const { t } = useTranslation();
    const [showServerTime, setShowServerTime] = useState(false);
    const userTimezone = getUserTimezoneInfo();

    return (
        <section className="gap-4 flex-c">
            <div className="server-timer-header gap-4 flex-c">
                <h2>{t('serverTimer.title')}</h2>
                <div className="header-content gap-2 flex-r">
                    <div className="user-timezone-display radius-4 wd border p-3">
                        <h6>{t('serverTimer.yourTimezone')}: {userTimezone.name} ({userTimezone.gmt})</h6>
                    </div>
                    <div className="timezone-switch-container radius-4 wd border p-3">
                        <label className="timezone-switch gap-2">
                            <input type="checkbox" checked={showServerTime} onChange={() => setShowServerTime(!showServerTime)} />
                            <span><h6>{t(showServerTime ? 'serverTimer.showLocalTime' : 'serverTimer.showServerTime')}</h6></span>
                        </label>
                    </div>
                </div>
            </div>
            <div id="server-timer-container" className='gap-4 flex-c'>
                {servers.map(server => (
                    <ServerItem key={server.key} server={server} showServerTime={showServerTime} />
                ))}
            </div>
        </section>
    );
};

export default ServerTimer;
