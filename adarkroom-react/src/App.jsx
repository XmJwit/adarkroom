import React, { useEffect, useState } from 'react';
import { useGameEngine, useGameEvent, useToggleVolume, useToggleLights, useToggleHyperMode, useRestartGame, useExportGame, useShareGame } from './hooks/useGameEngine';
import { useTranslation } from './hooks/useLocalization';
import Notifications from './components/Notifications/Notifications';
import Button from './components/Button/Button';
import './App.css';

function App() {
  const engine = useGameEngine();
  const t = useTranslation;
  
  const toggleVolume = useToggleVolume();
  const toggleLights = useToggleLights();
  const toggleHyperMode = useToggleHyperMode();
  const restartGame = useRestartGame();
  const exportGame = useExportGame();
  const shareGame = useShareGame();
  
  const [currentView, setCurrentView] = useState('room');

  useEffect(() => {
    // 监听游戏启动事件
    const unsubscribe = useGameEvent('gameStart', () => {
      setCurrentView('room');
    });

    return unsubscribe;
  }, []);

  return (
    <div className="app-container">
      {/* 顶部菜单栏 */}
      <div className="menu">
        <span className="menu-title">A Dark Room</span>
        
        <span 
          className="menu-btn volume"
          onClick={() => toggleVolume()}
          title={t('sound on.')}
        >
          {t('sound on.')}
        </span>

        <span 
          className="menu-btn lights-off"
          onClick={() => toggleLights()}
          title={t('lights off.')}
        >
          {t('lights off.')}
        </span>

        <span 
          className="menu-btn hyper"
          onClick={() => toggleHyperMode()}
          title={t('hyper.')}
        >
          {t('hyper.')}
        </span>

        <span 
          className="menu-btn"
          onClick={restartGame}
          title={t('restart.')}
        >
          {t('restart.')}
        </span>

        <span 
          className="menu-btn"
          onClick={shareGame}
          title={t('share.')}
        >
          {t('share.')}
        </span>

        <span 
          className="menu-btn"
          onClick={exportGame}
          title={t('save.')}
        >
          {t('save.')}
        </span>

        <span 
          className="menu-btn"
          onClick={() => window.open('https://github.com/doublespeakgames/adarkroom')}
          title={t('github.')}
        >
          {t('github.')}
        </span>
      </div>

      {/* 主游戏内容区 */}
      <div id="wrapper" className="wrapper">
        <div id="outerSlider" className="outer-slider">
          {/* 游戏内容将在这里插入 */}
          <div id="main" className="main">
            <h1>Game Content Here</h1>
            <p>Game engine initialized and ready for module implementation.</p>
          </div>
        </div>
      </div>

      {/* 通知系统 */}
      <Notifications />

      {/* 保存通知 */}
      <div id="saveNotify" className="save-notify"></div>
    </div>
  );
}

export default App;
