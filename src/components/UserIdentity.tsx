import React, { useState } from 'react';
import { LabSecrets, UserProfile } from '../types/game';
import { User, Key, Shield, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface UserIdentityProps {
  user: UserProfile;
  secrets: LabSecrets;
  onUpdateSecrets: (secrets: Partial<LabSecrets>) => void;
  disabled?: boolean;
}

export const UserIdentity: React.FC<UserIdentityProps> = ({ user, secrets, onUpdateSecrets, disabled }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const PROVIDERS = [
    { id: 'local', name: 'Local (Llama)', icon: '🏠' },
    { id: 'openai', name: 'OpenAI (GPT-4o)', icon: '🟢' },
    { id: 'anthropic', name: 'Anthropic (Claude)', icon: '🟠' },
    { id: 'huggingface', name: 'Hugging Face', icon: '🤗' }
  ];

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded backdrop-blur-sm">
      {/* Profile Summary */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white">
          <User className="w-4 h-4" />
        </div>
        <div className="flex-grow">
          <div className="text-[10px] font-bold text-white uppercase tracking-wider">{user.id}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[7px] px-1 bg-cyan-950 text-cyan-400 rounded border border-cyan-900/50 uppercase">{user.subscription_status}</span>
            <span className="text-[8px] text-gray-500 font-mono">{user.credits_remaining} CREDITS</span>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="w-3 h-3 text-gray-600" /> : <ChevronDown className="w-3 h-3 text-gray-600" />}
      </div>

      {isExpanded && (
        <div className="p-4 pt-0 border-t border-gray-800/50 space-y-4 animate-in slide-in-from-top-2 duration-200">
          
          {/* Provider Selection */}
          <div className="space-y-2 pt-4">
             <div className="text-[8px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
               <Shield className="w-2 h-2" /> Active Neural Provider
             </div>
             <div className="grid grid-cols-2 gap-2">
                {PROVIDERS.map(p => (
                  <button
                    key={p.id}
                    disabled={disabled}
                    onClick={() => onUpdateSecrets({ active_provider: p.id })}
                    className={cn(
                      "p-2 text-left rounded border transition-all",
                      secrets.active_provider === p.id 
                        ? "bg-cyan-950/30 border-cyan-500/50 text-cyan-400" 
                        : "bg-black/20 border-gray-800 text-gray-500 hover:border-gray-700"
                    )}
                  >
                    <div className="text-[10px] flex items-center gap-2">
                      <span>{p.icon}</span>
                      <span className="truncate">{p.name}</span>
                    </div>
                  </button>
                ))}
             </div>
          </div>

          {/* Secret Management */}
          <div className="space-y-3">
             <div className="text-[8px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
               <Key className="w-2 h-2" /> Secret Vault (Self-Provided)
             </div>
             
             <div className="space-y-2">
                <input 
                  type="password"
                  placeholder="OpenAI API Key"
                  disabled={disabled}
                  value={secrets.openai_api_key || ''}
                  onChange={(e) => onUpdateSecrets({ openai_api_key: e.target.value })}
                  className="w-full bg-black/40 border border-gray-800 rounded px-2 py-1.5 text-[9px] font-mono text-gray-300 focus:border-cyan-500/50 outline-none transition-colors"
                />
                <input 
                  type="password"
                  placeholder="Anthropic API Key"
                  disabled={disabled}
                  value={secrets.anthropic_api_key || ''}
                  onChange={(e) => onUpdateSecrets({ anthropic_api_key: e.target.value })}
                  className="w-full bg-black/40 border border-gray-800 rounded px-2 py-1.5 text-[9px] font-mono text-gray-300 focus:border-cyan-500/50 outline-none transition-colors"
                />
             </div>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-900/30 rounded text-[8px] font-bold text-cyan-500 hover:from-cyan-900/40 hover:to-blue-900/40 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
            <CreditCard className="w-3 h-3" /> Upgrade to Pro (System Keys)
          </button>

          <div className="text-[6px] text-gray-600 italic text-center">
            Keys are encrypted at rest and never shared between researchers.
          </div>
        </div>
      )}
    </div>
  );
};
