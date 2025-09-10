/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, Text } from 'ink';
import { StreamingContext } from '../contexts/StreamingContext.js';
import { Notifications } from '../components/Notifications.js';
import { MainContent } from '../components/MainContent.js';
import { DialogManager } from '../components/DialogManager.js';
import { Composer } from '../components/Composer.js';
import { Footer } from '../components/Footer.js';
import { useUIState } from '../contexts/UIStateContext.js';
import { useConfig } from '../contexts/ConfigContext.js';
import { useSettings } from '../contexts/SettingsContext.js';
import { theme } from '../semantic-colors.js';

export const ScreenReaderAppLayout: React.FC = () => {
  const uiState = useUIState();
  const config = useConfig();
  const settings = useSettings();

  return (
    <StreamingContext.Provider value={uiState.streamingState}>
      <Box flexDirection="column" width="90%" height="100%">
        <Notifications />
        <Footer
          model={config.getModel()}
          targetDir={config.getTargetDir()}
          debugMode={config.getDebugMode()}
          branchName={uiState.branchName}
          debugMessage={uiState.debugMessage}
          corgiMode={uiState.corgiMode}
          errorCount={uiState.errorCount}
          showErrorDetails={uiState.showErrorDetails}
          showMemoryUsage={
            config.getDebugMode() || settings.merged.ui?.showMemoryUsage || false
          }
          promptTokenCount={uiState.sessionStats.lastPromptTokenCount}
          nightly={uiState.nightly}
          isTrustedFolder={uiState.isTrustedFolder}
          vimMode={undefined}
        />
        <Box flexGrow={1} overflow="hidden">
          <MainContent />
        </Box>
        {uiState.dialogsVisible ? (
          <DialogManager addItem={uiState.historyManager.addItem} />
        ) : (
          <Composer />
        )}

        {uiState.dialogsVisible && uiState.ctrlDPressedOnce && (
          <Box marginTop={1}>
            <Text color={theme.status.warning}>
              Press Ctrl+C again to exit.
            </Text>
          </Box>
        )}

        {uiState.dialogsVisible && uiState.ctrlDPressedOnce && (
          <Box marginTop={1}>
            <Text color={theme.status.warning}>
              Press Ctrl+D again to exit.
            </Text>
          </Box>
        )}
      </Box>
    </StreamingContext.Provider>
  );
};