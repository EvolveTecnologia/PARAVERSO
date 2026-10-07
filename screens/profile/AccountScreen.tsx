import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { 
  Save, Camera, CreditCard, MapPin, 
  Phone, Mail, User, ShieldCheck, CheckCircle2, Sparkles, Building2
} from 'lucide-react';

interface AccountScreenProps {
  user: UserProfile;
  onUpdate: (u: UserProfile) => void;
}

const AccountScreen: React.FC<AccountScreenProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name || 'Placide Baundja Ikuba',
    email: user.email || 'cidadao@paraverso.pa.gov.br',
    cpf: user.cpf || '042.891.242-10',
    avatar: user.avatar || '/perfil.jpg',
    phone: '(91) 98452-1920',
    address: 'Av. Nazaré, 620 - Apto 802',
    neighborhood: 'Nazaré',
    city: 'Belém',
    state: 'PA',
    zip: '66035-170'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onUpdate({
        ...user,
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf,
        avatar: formData.avatar
      });
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    }, 700);
  };

  const activityHistory = [
    { id: 1, date: '15/02/2026', title: 'Acesso à Coleção Patrimonial e Saberes Amazônicos', category: 'Patrimonial e Saberes', status: 'Concluído' },
    { id: 2, date: '04/02/2026', title: 'Transmissão Ao Vivo: Festival de Carimbó de Marapanim', category: 'Eventos Culturais', status: 'Assistido' },
    { id: 3, date: '28/01/2026', title: 'Imersão 360° no Ver-o-Peso e Baía do Guajará', category: 'Documentários', status: 'Concluído' },
    { id: 4, date: '12/01/2026', title: 'Especial Bioeconomia & Cadeia do Açaí Paraense', category: 'Bioeconomia', status: 'Concluído' },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-4xl mx-auto text-white">
      
      {/* Feedback Toast */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 shadow-lg">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
          <span>Dados cadastrais atualizados com sucesso no sistema PARAVERSO!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* User Card & Avatar */}
        <div className="bg-[#132238] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-lg">
          <div className="relative group cursor-pointer w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#0072BC] shadow-xl bg-[#0A1626] shrink-0">
            <img 
              src={formData.avatar} 
              className="w-full h-full rounded-full object-cover object-center aspect-square" 
              alt="Avatar do Usuário" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face';
              }}
            />
            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <Camera className="text-white" size={24} />
            </div>
          </div>

          <div className="text-center sm:text-left flex-1 space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight truncate">
                {formData.name}
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0072BC]/20 text-[#00A3E0] border border-[#0072BC]/40 uppercase tracking-wider">
                <ShieldCheck size={12} /> Cidadão Verificado
              </span>
            </div>
            <p className="text-xs text-gray-400">{formData.email}</p>
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] text-gray-300">
              <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#00A3E0]" /> Nível Cultural 12
              </span>
              <span className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 flex items-center gap-1.5">
                <Building2 size={12} className="text-[#00A3E0]" /> SECULT-PA
              </span>
            </div>
          </div>
        </div>

        {/* Dados Pessoais */}
        <section className="bg-[#132238] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
          <h4 className="flex items-center gap-2 text-xs font-bold text-[#00A3E0] uppercase tracking-wider border-b border-white/10 pb-3">
            <User size={16} /> Dados Pessoais
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Nome Completo</label>
              <div className="bg-[#0A1626] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#0072BC] transition-colors">
                <User size={16} className="text-gray-400 shrink-0" />
                <input 
                  type="text"
                  required
                  className="bg-transparent text-white text-xs w-full outline-none"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">CPF / Identificação Oficial</label>
              <div className="bg-[#0A1626] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 opacity-80">
                <CreditCard size={16} className="text-gray-400 shrink-0" />
                <input 
                  type="text"
                  className="bg-transparent text-gray-300 text-xs w-full outline-none cursor-not-allowed"
                  value={formData.cpf}
                  disabled
                />
              </div>
              <p className="text-[10px] text-gray-400">Validado pela Secretaria de Estado de Cultura do Pará</p>
            </div>
          </div>
        </section>

        {/* Contatos */}
        <section className="bg-[#132238] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
          <h4 className="flex items-center gap-2 text-xs font-bold text-[#00A3E0] uppercase tracking-wider border-b border-white/10 pb-3">
            <Phone size={16} /> Contatos e Comunicação
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">E-mail Cadastrado</label>
              <div className="bg-[#0A1626] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#0072BC] transition-colors">
                <Mail size={16} className="text-gray-400 shrink-0" />
                <input 
                  type="email"
                  required
                  className="bg-transparent text-white text-xs w-full outline-none"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seuemail@exemplo.com.br"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Telefone / WhatsApp</label>
              <div className="bg-[#0A1626] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#0072BC] transition-colors">
                <Phone size={16} className="text-gray-400 shrink-0" />
                <input 
                  type="text"
                  className="bg-transparent text-white text-xs w-full outline-none"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(91) 98888-8888"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Endereço no Pará */}
        <section className="bg-[#132238] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
          <h4 className="flex items-center gap-2 text-xs font-bold text-[#00A3E0] uppercase tracking-wider border-b border-white/10 pb-3">
            <MapPin size={16} /> Endereço e Localização no Pará
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Logradouro / Rua e Número</label>
              <div className="bg-[#0A1626] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-[#0072BC] transition-colors">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <input 
                  type="text"
                  className="bg-transparent text-white text-xs w-full outline-none"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Rua, Avenida, Número, Complemento"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Bairro</label>
              <div className="bg-[#0A1626] border border-white/10 rounded-xl px-4 py-3">
                <input 
                  type="text"
                  className="bg-transparent text-white text-xs w-full outline-none"
                  value={formData.neighborhood}
                  onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                  placeholder="Bairro"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Município / Cidade</label>
              <div className="bg-[#0A1626] border border-white/10 rounded-xl px-4 py-3">
                <input 
                  type="text"
                  className="bg-transparent text-white text-xs w-full outline-none"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Belém, Santarém, etc."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Estado (UF)</label>
              <div className="bg-[#0A1626] border border-white/10 rounded-xl px-4 py-3">
                <input 
                  type="text"
                  className="bg-transparent text-white text-xs w-full outline-none"
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                  placeholder="PA"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">CEP</label>
              <div className="bg-[#0A1626] border border-white/10 rounded-xl px-4 py-3">
                <input 
                  type="text"
                  className="bg-transparent text-white text-xs w-full outline-none"
                  value={formData.zip}
                  onChange={e => setFormData({ ...formData, zip: e.target.value })}
                  placeholder="66000-000"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Histórico de Atividades Culturais */}
        <section className="bg-[#132238] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
          <h4 className="flex items-center gap-2 text-xs font-bold text-[#00A3E0] uppercase tracking-wider border-b border-white/10 pb-3">
            <Sparkles size={16} /> Histórico Recente no PARAVERSO
          </h4>

          <div className="space-y-2.5">
            {activityHistory.map((act) => (
              <div 
                key={act.id} 
                className="bg-[#0A1626] border border-white/5 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#0072BC]/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{act.title}</p>
                    <p className="text-[10px] text-gray-400">{act.category} • {act.date}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/5 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
                  {act.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-2">
          <button 
            type="submit"
            disabled={isSaving}
            className="w-full py-4 bg-[#0072BC] hover:bg-[#0086dc] text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-[#0072BC]/30 cursor-pointer active:scale-[0.99]"
          >
            {isSaving ? (
              <span className="animate-pulse flex items-center gap-2">
                Salvando alterações...
              </span>
            ) : (
              <>
                <Save size={16} /> Salvar Alterações
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AccountScreen;
