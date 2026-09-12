import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  FileText, 
  Share2, 
  Database, 
  Printer,
  Github,
  Terminal,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { CausalStudy } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  study: CausalStudy;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, study }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownload = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const jsonStudyData = JSON.stringify(study, null, 2);

  const gitCommands = `# Развертывание репозитория: Breast-cancer-diagnosis-CLD
git init
git add .
git commit -m "feat: Breast cancer diagnosis CLD - Faust View AI study"
git branch -M main
git remote add origin https://github.com/ai2medica/Breast-cancer-diagnosis-CLD.git
git push -u origin main`;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl p-6 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Экспорт и деплой на GitHub</h3>
              <p className="text-xs text-slate-400">Сохраните исследование или разверните репозиторий «Breast cancer diagnosis CLD»</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GitHub Deployment Banner */}
        <div className="bg-gradient-to-br from-slate-800 to-indigo-950/50 border border-indigo-500/30 p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/30">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-white">Репозиторий: Breast-cancer-diagnosis-CLD</h4>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono font-medium">Готов к деплою</span>
                </div>
                <p className="text-xs text-slate-300">Включает GitHub Actions workflow, README.md с описанием ГомГМУ и формулами CMA</p>
              </div>
            </div>
            <button
              onClick={() => handleCopy(gitCommands, 'git')}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl transition cursor-pointer"
            >
              {copiedType === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'git' ? 'Скопировано!' : 'Копировать git CLI'}</span>
            </button>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1 overflow-x-auto">
            <div className="text-slate-500 flex items-center space-x-1.5 mb-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Команды для терминала:</span>
            </div>
            <p className="text-emerald-400">git remote add origin https://github.com/ai2medica/Breast-cancer-diagnosis-CLD.git</p>
            <p className="text-emerald-400">git branch -M main</p>
            <p className="text-indigo-300">git push -u origin main</p>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
            <span>✨ Способ 2: Нажмите в правом верхнем углу AI Studio меню <b>Settings / Export to GitHub</b></span>
          </div>
        </div>

        <div className="space-y-3">
          {/* JSON Export */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">JSON Схема причинного графа</h4>
                <p className="text-[11px] text-slate-400">Полная модель: узлы, полярности связей, петли и координаты</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => handleCopy(jsonStudyData, 'json')}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs transition cursor-pointer"
                title="Копировать"
              >
                {copiedType === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => handleDownload(jsonStudyData, `${study.id}.json`, 'application/json')}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
              >
                Скачать JSON
              </button>
            </div>
          </div>

          {/* Markdown Paper Export */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Научный отчет в Markdown (.md)</h4>
                <p className="text-[11px] text-slate-400">Готовая академическая статья с 7 таблицами и выводами</p>
              </div>
            </div>
            <button
              onClick={() => handleDownload(study.scientificPaper?.introduction || '', `${study.id}-paper.md`, 'text/markdown')}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
            >
              Скачать .md
            </button>
          </div>

          {/* Printable Layout */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Печать / Сохранить в PDF</h4>
                <p className="text-[11px] text-slate-400">Форматированная версия для печати через диалог браузера</p>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition cursor-pointer"
            >
              Печать (Ctrl+P)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
