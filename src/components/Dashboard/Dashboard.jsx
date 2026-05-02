import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// === COMPONENTES ===
import RecipesList from '../Recipes/RecipesList';
import PreciosMayoristas from '../Excel/PreciosMayoristas';
import FactorCorreccion from '../Excel/FactorCorreccion';
import SupplierQA from '../Excel/SupplierQA';
import Monitor from '../Excel/Monitor';
import TechReports from '../Reports/TechReports';

import {
  BookOpen, FileSpreadsheet, Scale, ShieldCheck, TrendingUp, PieChart
} from 'lucide-react';

const TABS = [
  { id: 'recetas',   label: 'Mis Recetas',          icon: BookOpen,        component: RecipesList },
  { id: 'precios',   label: 'Lista de Precios',     icon: FileSpreadsheet, component: PreciosMayoristas },
  { id: 'factor',    label: 'Factor Corrección',    icon: Scale,           component: FactorCorreccion },
  { id: 'monitor',   label: 'Monitor Rentabilidad', icon: TrendingUp,      component: Monitor },
  { id: 'qa',        label: 'Proveedores (QA)',     icon: ShieldCheck,     component: SupplierQA },
  { id: 'reportes',  label: 'Informes & KPIs',      icon: PieChart,        component: TechReports },
];

function SubTab({ tab, isActive, accentColor, onClick }) {
  const Icon = tab.icon;
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.6rem 1rem',
        background: isActive ? 'var(--bg-secondary)' : 'transparent',
        border: 'none',
        borderBottom: isActive ? `3px solid ${accentColor}` : '3px solid transparent',
        color: isActive ? accentColor : 'var(--text-secondary)',
        fontWeight: isActive ? '700' : '500',
        fontSize: '0.8rem',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        transition: 'all 0.18s ease',
        borderRadius: '8px 8px 0 0',
        fontFamily: 'var(--font-family)',
        letterSpacing: isActive ? '0.01em' : '0',
      }}
    >
      <Icon size={14} />
      {tab.label}
    </button>
  );
}

export default function Dashboard() {
  const [activeTabId, setActiveTabId] = useState('recetas');

  const activeTab = TABS.find(t => t.id === activeTabId) || TABS[0];
  const ActiveComponent = activeTab?.component;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)', gap: 0 }}>

      {/* ── Header Title ── */}
      <div style={{
        padding: '1.5rem 1.5rem 0',
        background: 'var(--bg-primary)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, #2C5F6F 0%, #3d7d91 100%)',
          borderRadius: '16px',
          color: 'white',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        }}>
          <div style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>📈</div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.08em' }}>COSTEO ACADÉMICO</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '0.2rem' }}>Gestión de Recetas, Fichas Técnicas y Proveedores</div>
          </div>
        </div>
      </div>

      {/* ── Sub-tab bar ── */}
      <div style={{
        background: 'var(--bg-tertiary)',
        borderBottom: '2px solid var(--border-color)',
        padding: '0 1.5rem',
        overflowX: 'auto',
        display: 'flex',
        gap: '0.15rem',
        marginTop: '1.25rem',
        scrollbarWidth: 'none',
      }}>
        {TABS.map(tab => (
          <SubTab
            key={tab.id}
            tab={tab}
            isActive={activeTabId === tab.id}
            accentColor="#D4A93A"
            onClick={() => setActiveTabId(tab.id)}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{
        flex: 1,
        background: 'var(--bg-primary)',
        padding: '2rem 1.5rem',
        overflowY: 'auto',
        animation: 'fadeIn 0.22s ease',
      }}>
        {ActiveComponent && <ActiveComponent />}
      </div>

    </div>
  );
}
