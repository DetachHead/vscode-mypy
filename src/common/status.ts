// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { LanguageStatusItem, Disposable, l10n, LanguageStatusSeverity } from 'vscode';
import { createLanguageStatusItem, getDocumentSelector } from './vscodeapi';
import { Command } from 'vscode-languageclient';

let _status: LanguageStatusItem | undefined;
export function registerLanguageStatusItem(id: string, name: string, command: string): Disposable {
    _status = createLanguageStatusItem(id, getDocumentSelector());
    _status.name = name;
    _status.text = name;
    _status.command = Command.create(l10n.t('Open logs'), command);

    return {
        dispose: () => {
            _status?.dispose();
            _status = undefined;
        },
    };
}

export function updateStatus(status: string, severity: LanguageStatusSeverity, busy?: boolean, detail?: string): void {
    if (_status) {
        _status.text = status.length === 0 ? `${_status.name}` : `${_status.name}: ${status}`;
        _status.severity = severity;
        _status.busy = busy ?? false;
        _status.detail = detail;
    }
}
