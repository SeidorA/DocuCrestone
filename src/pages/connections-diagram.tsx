import React, { useState, useRef } from 'react';
import Layout from '@theme/Layout';
import { Brand, CaralIcon } from 'iconcaral2';
import connectionsData from '../../../../../../../../seidor/portal/Portal/src/components/CrestoneConnections/connections.json';

// SVG Crestone Logo with customizable colors
function CrestoneLogo({ color1 = "#66B6FF", color2 = "#ffffff", size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M23.0629 8.97536C25.5489 8.97536 27.5643 7.02884 27.5643 4.62769C27.5643 2.22655 25.5489 0.280029 23.0629 0.280029C20.5768 0.280029 18.5614 2.22655 18.5614 4.62769C18.5614 7.02884 20.5768 8.97536 23.0629 8.97536Z" fill={color1} />
        <path d="M4.78148 18.3869C7.26757 18.3869 9.28294 16.4403 9.28294 14.0392C9.28294 11.638 7.26757 9.69153 4.78148 9.69153C2.2954 9.69153 0.280029 11.638 0.280029 14.0392C0.280029 16.4403 2.2954 18.3869 4.78148 18.3869Z" fill={color1} />
        <path d="M27.7201 23.3724C27.7201 25.7735 25.7047 27.72 23.2186 27.72C20.7325 27.72 18.7172 25.7735 18.7172 23.3724C18.7172 20.9712 20.7325 19.0247 23.2186 19.0247C25.7047 19.0247 27.7201 20.9712 27.7201 23.3724Z" fill={color1} />
        <path d="M8.84239 18.5205C10.2395 20.6674 12.7205 22.0082 15.8806 22.0082H17.2155C17.109 22.4466 17.0514 22.9028 17.0514 23.3724C17.0514 24.5943 17.433 25.7297 18.0861 26.675H15.6389C9.59397 26.675 5.12963 23.8349 3.02051 19.7483C3.57845 19.9088 4.16947 19.9961 4.78147 19.9961C6.33709 19.9961 7.75757 19.4385 8.84239 18.5205Z" fill={color2} />
        <path d="M17.0966 6.14145H15.8802C12.748 6.14145 10.2823 7.47326 8.87873 9.58865C7.78907 8.65233 6.35448 8.08267 4.78111 8.08267C4.18484 8.08267 3.60915 8.16605 3.06371 8.3184C5.19059 4.27622 9.63516 1.47467 15.639 1.47467H17.8308C17.2386 2.38917 16.8953 3.46966 16.8953 4.62768C16.8953 5.15098 16.9655 5.6579 17.097 6.14145H17.0966Z" fill={color2} />
      </g>
    </svg>
  );
}

// Reusable Connection Card matching Figma specifications
interface ConnectionCardProps {
  title: string;
  icon: string;
  brand: boolean;
  theme: 'light' | 'dark';
}

function ConnectionCard({ title, icon, brand, theme }: ConnectionCardProps) {
  const isDark = theme === 'dark';
  return (
    <div style={{
      backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
      border: isDark ? '2px solid #334155' : '2px solid #e2e8f0',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 14px',
      width: '260px',
      height: '50px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
      color: isDark ? '#f1f5f9' : '#242528',
      boxShadow: isDark
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
        : '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      <div style={{
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {brand ? <Brand name={icon as any} size={30} /> : <CaralIcon name={icon as any} size={30} color={isDark ? '#f1f5f9' : '#242528'} />}
      </div>
      <span style={{
        fontFamily: "'Poppins', 'Outfit', 'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: 500,
        color: isDark ? '#f1f5f9' : '#242528',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {title}
      </span>
    </div>
  );
}

const translations = {
  en: {
    generatorTitle: 'Connections Diagram Generator',
    generatorSubtitle: 'Customize and download the current Crestone ecosystem map. This diagram updates dynamically from your system\'s data and can be downloaded as a high-resolution transparent PNG, perfect for PowerPoint slides, web portals, or internal docs.',
    mainTitle: 'Crestone Connection Matrix',
    mainSubtitle: 'Ecosystem of SAP Origins and Target Cloud Destinations',
    origins: 'Source',
    destinations: 'Destinations',
    canvasTitle: 'Canvas Style',
    cardTitle: 'Card Style',
    pathColorTitle: 'Path Colors',
    gridTitle: 'Grid Style',
    pathStyleTitle: 'Path Style',
    showMainTitleLabel: 'Show Diagram Title',
    showMainSubtitleLabel: 'Show Diagram Subtitle',
    showColumnTitlesLabel: 'Show Column Headers',
    languageLabel: 'Title Language',
    customTitleLabel: 'Custom Diagram Title',
    customSubtitleLabel: 'Custom Diagram Subtitle',
    downloadDiagram: 'Download Diagram (PNG)',
    individualAssetsTitle: 'Individual Assets Export',
    individualAssetsSubtitle: 'Export each connection source or destination card as a high-resolution (3x) standalone PNG asset. Each asset is rendered with custom padding and inherits the active Canvas and Card styles selected above.',
    downloadAllOrigins: 'Download All Origins',
    downloadAllDestinations: 'Download All Destinations',
    exportCard: 'Export Card',
    exporting: 'Exporting...',
    downloading: 'Downloading...',
    generatingPng: 'Generating PNG...',
  },
  es: {
    generatorTitle: 'Generador de Diagrama de Conexiones',
    generatorSubtitle: 'Personaliza y descarga el mapa actual del ecosistema Crestone. Este diagrama se actualiza dinámicamente con los datos de tu sistema y puede descargarse como un PNG transparente en alta resolución, ideal para diapositivas de PowerPoint, portales web o documentación interna.',
    mainTitle: 'Matriz de Conexión Crestone',
    mainSubtitle: 'Ecosistema de Orígenes SAP y Destinos en la Nube',
    origins: 'Orígenes',
    destinations: 'Destinos',
    canvasTitle: 'Estilo de Lienzo',
    cardTitle: 'Estilo de Tarjeta',
    pathColorTitle: 'Colores de Ruta',
    gridTitle: 'Estilo de Rejilla',
    pathStyleTitle: 'Estilo de Ruta',
    showMainTitleLabel: 'Mostrar Título de Diagrama',
    showMainSubtitleLabel: 'Mostrar Subtítulo de Diagrama',
    showColumnTitlesLabel: 'Mostrar Cabeceras de Columna',
    languageLabel: 'Idioma de Títulos',
    customTitleLabel: 'Título de Diagrama Personalizado',
    customSubtitleLabel: 'Subtítulo de Diagrama Personalizado',
    downloadDiagram: 'Descargar Diagrama (PNG)',
    individualAssetsTitle: 'Exportación de Assets Individuales',
    individualAssetsSubtitle: 'Exporta cada tarjeta de origen o destino como un asset PNG independiente en alta resolución (3x). Cada asset se genera con relleno personalizado y hereda los estilos de lienzo y tarjeta activos seleccionados arriba.',
    downloadAllOrigins: 'Descargar Todos los Orígenes',
    downloadAllDestinations: 'Descargar Todos los Destinos',
    exportCard: 'Exportar Tarjeta',
    exporting: 'Exportando...',
    downloading: 'Descargando...',
    generatingPng: 'Generando PNG...',
  }
};

export default function ConnectionsDiagram() {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Customization States
  const [bgTheme, setBgTheme] = useState<'light' | 'dark' | 'gradient' | 'transparent'>('gradient');
  const [cardTheme, setCardTheme] = useState<'light' | 'dark'>('dark');
  const [pathType, setPathType] = useState<'curved' | 'orthogonal' | 'hidden'>('curved');
  const [showMainTitle, setShowMainTitle] = useState(true);
  const [showMainSubtitle, setShowMainSubtitle] = useState(true);
  const [showColumnTitles, setShowColumnTitles] = useState(true);
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const t = translations[lang];

  const [customMainTitle, setCustomMainTitle] = useState('');
  const [customMainSubtitle, setCustomMainSubtitle] = useState('');

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadingCardId, setDownloadingCardId] = useState<string | null>(null);
  const [downloadingCategory, setDownloadingCategory] = useState<'origins' | 'destinations' | null>(null);

  // Line & Grid Color Customization States
  const [lineColorType, setLineColorType] = useState<'auto' | 'custom'>('auto');
  const [customLineColor, setCustomLineColor] = useState('#6366f1');
  const [gridType, setGridType] = useState<'dots' | 'lines' | 'none'>('dots');
  const [gridColor, setGridColor] = useState('#64748b');

  // Origins and Destinations from JSON
  const origins = connectionsData.origins;
  const destinations = connectionsData.destinations;

  // Visibility States for individual cards
  const [visibleOrigins, setVisibleOrigins] = useState<string[]>(origins.map(o => o.id));
  const [visibleDestinations, setVisibleDestinations] = useState<string[]>(destinations.map(d => d.id));

  const activeOrigins = origins.filter(o => visibleOrigins.includes(o.id));
  const activeDestinations = destinations.filter(d => visibleDestinations.includes(d.id));

  // Constants for dimensions and layout calculations (deterministic absolute layout)
  const canvasWidth = 1200;
  const canvasHeight = 1150;
  const columnWidth = 260;

  // Origins Layout Calculations
  const origListHeight = activeOrigins.length > 0 ? (activeOrigins.length * 50 + (activeOrigins.length - 1) * 12) : 0;
  const origStartTop = 85 + (980 - origListHeight) / 2;

  // Destinations Layout Calculations
  const destListHeight = activeDestinations.length > 0 ? (activeDestinations.length * 50 + (activeDestinations.length - 1) * 12) : 0;
  const destStartTop = 85 + (980 - destListHeight) / 2;

  // Hub Center coordinates
  const hubX = 600;
  const hubY = 85 + 980 / 2; // 575

  // Download Trigger
  const downloadPng = async () => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    try {
      setIsDownloading(true);
      const { toPng } = await import('html-to-image');

      // Capturing at 2x resolution for printing and presentations
      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: 2,
        backgroundColor: bgTheme === 'transparent' ? 'transparent' : undefined,
        style: {
          transform: 'scale(1)',
        }
      });

      const link = document.createElement('a');
      link.download = `crestone-connections-${bgTheme}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error creating connections PNG:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Download single card as high-res PNG
  const downloadSingleCard = async (id: string, title: string) => {
    if (typeof window === 'undefined') return;
    const element = document.getElementById(`card-export-${id}`);
    if (!element) return;

    try {
      setDownloadingCardId(id);
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(element, {
        pixelRatio: 3,
        backgroundColor: bgTheme === 'transparent' ? 'transparent' : undefined,
        style: {
          transform: 'scale(1)',
        }
      });

      const link = document.createElement('a');
      const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      link.download = `crestone-card-${safeTitle}-${bgTheme}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error creating single card PNG:', error);
    } finally {
      setDownloadingCardId(null);
    }
  };

  // Download all cards of a specific category sequentially
  const downloadAllCards = async (items: typeof origins, category: 'origins' | 'destinations') => {
    if (typeof window === 'undefined') return;
    try {
      setDownloadingCategory(category);
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        await downloadSingleCard(item.id, item.title);
        // Delay to prevent browser throttling multiple concurrent downloads
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    } catch (error) {
      console.error(`Error downloading all ${category}:`, error);
    } finally {
      setDownloadingCategory(null);
    }
  };

  // Determine container styling based on background selection
  const getContainerStyle = () => {
    switch (bgTheme) {
      case 'light':
        return { backgroundColor: '#f8fafc', color: '#0f172a' };
      case 'dark':
        return { backgroundColor: '#0f172a', color: '#f8fafc' };
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
          color: '#ffffff'
        };
      case 'transparent':
      default:
        return {
          backgroundColor: 'transparent',
          color: cardTheme === 'dark' ? '#f8fafc' : '#0f172a'
        };
    }
  };

  // Determine connection lines properties
  const getLineStroke = (isDestination: boolean) => {
    if (lineColorType === 'custom') {
      return customLineColor;
    }
    if (bgTheme === 'gradient' || (bgTheme === 'transparent' && cardTheme === 'dark')) {
      return isDestination ? 'url(#destGrad)' : 'url(#originGrad)';
    }
    if (bgTheme === 'light' || (bgTheme === 'transparent' && cardTheme === 'light')) {
      return '#cbd5e1';
    }
    return '#475569';
  };

  return (
    <Layout title={t.generatorTitle} description="Export a beautiful high-resolution diagram of Crestone connections">
      <div style={{
        padding: '40px 20px',
        maxWidth: '1600px',
        margin: '0 auto',
        fontFamily: "'Inter', sans-serif"
      }}>
        {/* Header and Introduction */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontWeight: 800, fontSize: '36px', marginBottom: '8px', background: 'linear-gradient(90deg, #3b82f6, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t.generatorTitle}
          </h1>
          <p style={{ color: 'var(--ifm-color-gray-medium-dark)', fontSize: '16px', maxWidth: '800px' }}>
            {t.generatorSubtitle}
          </p>
        </div>

        {/* Two-Column Desktop Layout */}
        <div style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
          {/* Left Column: Sticky Sidebar Controls */}
          <div style={{
            flex: '0 0 320px',
            width: '320px',
            position: 'sticky',
            top: '100px',
            maxHeight: 'calc(100vh - 140px)',
            overflowY: 'auto',
            backgroundColor: 'var(--ifm-card-background-color)',
            border: '1px solid var(--ifm-toc-border-color)',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxSizing: 'border-box',
            zIndex: 10
          }}>
            {/* Background Selector */}
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ifm-color-gray-medium-dark)', marginBottom: '8px' }}>
                {t.canvasTitle}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(['gradient', 'dark', 'light', 'transparent'] as const).map((tVal) => (
                  <button
                    key={tVal}
                    onClick={() => {
                      setBgTheme(tVal);
                      if (tVal === 'light') setCardTheme('light');
                      if (tVal === 'dark' || tVal === 'gradient') setCardTheme('dark');
                    }}
                    style={{
                      flex: '1 1 auto',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      border: bgTheme === tVal ? '2px solid #3b82f6' : '1px solid var(--ifm-toc-border-color)',
                      backgroundColor: bgTheme === tVal ? '#e0f2fe' : 'var(--ifm-background-color)',
                      color: bgTheme === tVal ? '#0369a1' : 'var(--ifm-color-content)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tVal}
                  </button>
                ))}
              </div>
            </div>

            {/* Card Style Selector */}
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ifm-color-gray-medium-dark)', marginBottom: '8px' }}>
                {t.cardTitle}
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['light', 'dark'] as const).map((tVal) => (
                  <button
                    key={tVal}
                    onClick={() => setCardTheme(tVal)}
                    style={{
                      flex: '1',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      border: cardTheme === tVal ? '2px solid #3b82f6' : '1px solid var(--ifm-toc-border-color)',
                      backgroundColor: cardTheme === tVal ? '#e0f2fe' : 'var(--ifm-background-color)',
                      color: cardTheme === tVal ? '#0369a1' : 'var(--ifm-color-content)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tVal}
                  </button>
                ))}
              </div>
            </div>

            {/* Path Colors Selector */}
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ifm-color-gray-medium-dark)', marginBottom: '8px' }}>
                {t.pathColorTitle}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['auto', 'custom'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setLineColorType(type)}
                      style={{
                        flex: '1',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        border: lineColorType === type ? '2px solid #3b82f6' : '1px solid var(--ifm-toc-border-color)',
                        backgroundColor: lineColorType === type ? '#e0f2fe' : 'var(--ifm-background-color)',
                        color: lineColorType === type ? '#0369a1' : 'var(--ifm-color-content)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {lineColorType === 'custom' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <input
                      type="color"
                      value={customLineColor}
                      onChange={(e) => setCustomLineColor(e.target.value)}
                      style={{
                        border: '1px solid var(--ifm-toc-border-color)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '32px',
                        height: '32px',
                        padding: '1px'
                      }}
                    />
                    <span style={{ fontSize: '12px', fontWeight: 500, fontFamily: 'monospace' }}>
                      {customLineColor}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Grid Options Selector */}
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ifm-color-gray-medium-dark)', marginBottom: '8px' }}>
                {t.gridTitle}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['none', 'dots', 'lines'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setGridType(type)}
                      style={{
                        flex: '1',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        border: gridType === type ? '2px solid #3b82f6' : '1px solid var(--ifm-toc-border-color)',
                        backgroundColor: gridType === type ? '#e0f2fe' : 'var(--ifm-background-color)',
                        color: gridType === type ? '#0369a1' : 'var(--ifm-color-content)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {gridType !== 'none' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <input
                      type="color"
                      value={gridColor}
                      onChange={(e) => setGridColor(e.target.value)}
                      style={{
                        border: '1px solid var(--ifm-toc-border-color)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '32px',
                        height: '32px',
                        padding: '1px'
                      }}
                    />
                    <span style={{ fontSize: '12px', fontWeight: 500, fontFamily: 'monospace' }}>
                      {gridColor}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Path Style Selector */}
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ifm-color-gray-medium-dark)', marginBottom: '8px' }}>
                {t.pathStyleTitle}
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['curved', 'orthogonal', 'hidden'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPathType(type)}
                    style={{
                      flex: '1',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      border: pathType === type ? '2px solid #3b82f6' : '1px solid var(--ifm-toc-border-color)',
                      backgroundColor: pathType === type ? '#e0f2fe' : 'var(--ifm-background-color)',
                      color: pathType === type ? '#0369a1' : 'var(--ifm-color-content)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ifm-color-gray-medium-dark)', marginBottom: '8px' }}>
                {t.languageLabel}
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {([
                  { code: 'en', label: 'English' },
                  { code: 'es', label: 'Español' }
                ] as const).map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    style={{
                      flex: '1',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      border: lang === l.code ? '2px solid #3b82f6' : '1px solid var(--ifm-toc-border-color)',
                      backgroundColor: lang === l.code ? '#e0f2fe' : 'var(--ifm-background-color)',
                      color: lang === l.code ? '#0369a1' : 'var(--ifm-color-content)',
                      fontWeight: 600,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Granular Visibility Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--ifm-toc-border-color)', paddingTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
                <input
                  type="checkbox"
                  checked={showMainTitle}
                  onChange={(e) => setShowMainTitle(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                {t.showMainTitleLabel}
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
                <input
                  type="checkbox"
                  checked={showMainSubtitle}
                  onChange={(e) => setShowMainSubtitle(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                {t.showMainSubtitleLabel}
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
                <input
                  type="checkbox"
                  checked={showColumnTitles}
                  onChange={(e) => setShowColumnTitles(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                {t.showColumnTitlesLabel}
              </label>
            </div>

            {/* Text Customization Inputs */}
            <div style={{ borderTop: '1px solid var(--ifm-toc-border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ifm-color-gray-medium-dark)', marginBottom: '6px' }}>
                  {t.customTitleLabel}
                </span>
                <input
                  type="text"
                  value={customMainTitle}
                  onChange={(e) => setCustomMainTitle(e.target.value)}
                  placeholder={t.mainTitle}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--ifm-toc-border-color)',
                    backgroundColor: 'var(--ifm-background-color)',
                    color: 'var(--ifm-color-content)',
                    fontSize: '13px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ifm-color-gray-medium-dark)', marginBottom: '6px' }}>
                  {t.customSubtitleLabel}
                </span>
                <input
                  type="text"
                  value={customMainSubtitle}
                  onChange={(e) => setCustomMainSubtitle(e.target.value)}
                  placeholder={t.mainSubtitle}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--ifm-toc-border-color)',
                    backgroundColor: 'var(--ifm-background-color)',
                    color: 'var(--ifm-color-content)',
                    fontSize: '13px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Show/Hide Connections */}
            <div style={{ borderTop: '1px solid var(--ifm-toc-border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--ifm-color-gray-medium-dark)' }}>
                {lang === 'es' ? 'Mostrar/Ocultar Conexiones' : 'Show/Hide Connections'}
              </span>
              
              {/* Origins Checklist */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ifm-color-content)' }}>
                    {t.origins}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setVisibleOrigins(origins.map(o => o.id))}
                      style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                    >
                      {lang === 'es' ? 'Todos' : 'All'}
                    </button>
                    <span style={{ color: 'var(--ifm-color-gray-medium-dark)', fontSize: '11px' }}>|</span>
                    <button
                      onClick={() => setVisibleOrigins([])}
                      style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                    >
                      {lang === 'es' ? 'Ninguno' : 'None'}
                    </button>
                  </div>
                </div>
                <div style={{
                  maxHeight: '120px',
                  overflowY: 'auto',
                  border: '1px solid var(--ifm-toc-border-color)',
                  borderRadius: '6px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  backgroundColor: 'var(--ifm-background-color)'
                }}>
                  {origins.map((o) => {
                    const isChecked = visibleOrigins.includes(o.id);
                    return (
                      <label key={o.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: 'var(--ifm-color-content)' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setVisibleOrigins([...visibleOrigins, o.id]);
                            } else {
                              setVisibleOrigins(visibleOrigins.filter(id => id !== o.id));
                            }
                          }}
                          style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        />
                        {o.title}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Destinations Checklist */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ifm-color-content)' }}>
                    {t.destinations}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setVisibleDestinations(destinations.map(d => d.id))}
                      style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                    >
                      {lang === 'es' ? 'Todos' : 'All'}
                    </button>
                    <span style={{ color: 'var(--ifm-color-gray-medium-dark)', fontSize: '11px' }}>|</span>
                    <button
                      onClick={() => setVisibleDestinations([])}
                      style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                    >
                      {lang === 'es' ? 'Ninguno' : 'None'}
                    </button>
                  </div>
                </div>
                <div style={{
                  maxHeight: '120px',
                  overflowY: 'auto',
                  border: '1px solid var(--ifm-toc-border-color)',
                  borderRadius: '6px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  backgroundColor: 'var(--ifm-background-color)'
                }}>
                  {destinations.map((d) => {
                    const isChecked = visibleDestinations.includes(d.id);
                    return (
                      <label key={d.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: 'var(--ifm-color-content)' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setVisibleDestinations([...visibleDestinations, d.id]);
                            } else {
                              setVisibleDestinations(visibleDestinations.filter(id => id !== d.id));
                            }
                          }}
                          style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        />
                        {d.title}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Canvas & Individual Exports Container */}
          <div style={{
            flex: '1',
            minWidth: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            <div style={{
              overflowX: 'auto',
              borderRadius: '12px',
              border: '1px solid var(--ifm-toc-border-color)',
              backgroundColor: '#f1f5f9',
              padding: '20px 0',
              display: 'flex',
              justifyContent: 'center'
            }}>
              {/* Capture Canvas */}
          <div
            id="diagram-canvas"
            ref={canvasRef}
            style={{
              width: `${canvasWidth}px`,
              height: `${canvasHeight}px`,
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              ...getContainerStyle()
            }}
          >
            {/* Grid Pattern Background Layer */}
            {gridType !== 'none' && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: gridType === 'dots'
                  ? `radial-gradient(${gridColor} 1.5px, transparent 1.5px)`
                  : `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
                opacity: gridType === 'dots' ? 0.25 : 0.15,
                pointerEvents: 'none',
                zIndex: 0
              }} />
            )}

            {/* SVG Path Layer */}
            {pathType !== 'hidden' && (
              <svg style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1
              }}>
                <defs>
                  <linearGradient id="originGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#66B6FF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#07153A" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="destGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#07153A" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#66B6FF" stopOpacity={0.4} />
                  </linearGradient>
                </defs>

                {/* Draw curves or orthogonal lines from Origins to Hub */}
                {activeOrigins.map((_, i) => {
                  const cardY = origStartTop + i * 62 + 25;

                  let d = '';
                  if (pathType === 'curved') {
                    d = `M 320 ${cardY} C 410 ${cardY}, 440 ${hubY}, 525 ${hubY}`;
                  } else {
                    const R = 10;
                    const X_start = 320;
                    const X_end = 525;
                    const X_trunk = 410;
                    if (cardY === hubY) {
                      d = `M ${X_start} ${cardY} H ${X_end}`;
                    } else if (cardY < hubY) {
                      d = `M ${X_start} ${cardY} H ${X_trunk - R} Q ${X_trunk} ${cardY} ${X_trunk} ${cardY + R} V ${hubY - R} Q ${X_trunk} ${hubY} ${X_trunk + R} ${hubY} H ${X_end}`;
                    } else {
                      d = `M ${X_start} ${cardY} H ${X_trunk - R} Q ${X_trunk} ${cardY} ${X_trunk} ${cardY - R} V ${hubY + R} Q ${X_trunk} ${hubY} ${X_trunk + R} ${hubY} H ${X_end}`;
                    }
                  }

                  return (
                    <g key={`orig-path-${i}`}>
                      <path
                        d={d}
                        fill="none"
                        stroke={getLineStroke(false)}
                        strokeWidth="2.5"
                        strokeDasharray={bgTheme === 'gradient' ? 'none' : undefined}
                      />
                      <circle cx="320" cy={cardY} r="5" fill={getLineStroke(false)} />
                    </g>
                  );
                })}

                {/* Draw curves or orthogonal lines from Hub to Destinations */}
                {activeDestinations.map((_, j) => {
                  const cardY = destStartTop + j * 62 + 25;

                  let d = '';
                  if (pathType === 'curved') {
                    d = `M 675 ${hubY} C 760 ${hubY}, 790 ${cardY}, 880 ${cardY}`;
                  } else {
                    const R = 10;
                    const X_start = 675;
                    const X_end = 880;
                    const X_trunk = 790;
                    if (cardY === hubY) {
                      d = `M ${X_start} ${cardY} H ${X_end}`;
                    } else if (hubY > cardY) {
                      d = `M ${X_start} ${hubY} H ${X_trunk - R} Q ${X_trunk} ${hubY} ${X_trunk} ${hubY - R} V ${cardY + R} Q ${X_trunk} ${cardY} ${X_trunk + R} ${cardY} H ${X_end}`;
                    } else {
                      d = `M ${X_start} ${hubY} H ${X_trunk - R} Q ${X_trunk} ${hubY} ${X_trunk} ${hubY + R} V ${cardY - R} Q ${X_trunk} ${cardY} ${X_trunk + R} ${cardY} H ${X_end}`;
                    }
                  }

                  return (
                    <g key={`dest-path-${j}`}>
                      <path
                        d={d}
                        fill="none"
                        stroke={getLineStroke(true)}
                        strokeWidth="2.5"
                        strokeDasharray={bgTheme === 'gradient' ? 'none' : undefined}
                      />
                      <circle cx="880" cy={cardY} r="5" fill={getLineStroke(true)} />
                    </g>
                  );
                })}

                {/* Central Hub Connector Pins */}
                <circle cx="525" cy={hubY} r="5" fill={getLineStroke(false)} />
                <circle cx="675" cy={hubY} r="5" fill={getLineStroke(true)} />
              </svg>
            )}

            {/* Canvas Header (Optional) */}
            {(showMainTitle || showMainSubtitle) && (
              <div style={{
                position: 'absolute',
                top: '30px',
                left: 0,
                width: '100%',
                textAlign: 'center',
                zIndex: 3
              }}>
                {showMainTitle && (
                  <h2 style={{
                    margin: 0,
                    fontFamily: "'Poppins', 'Outfit', sans-serif",
                    fontSize: '24px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    color: bgTheme === 'light' || (bgTheme === 'transparent' && cardTheme === 'light') ? '#0f172a' : '#ffffff'
                  }}>
                    {customMainTitle || t.mainTitle}
                  </h2>
                )}
                {showMainSubtitle && (
                  <p style={{
                    margin: '4px 0 0 0',
                    fontSize: '12px',
                    opacity: 0.7,
                    color: bgTheme === 'light' || (bgTheme === 'transparent' && cardTheme === 'light') ? '#475569' : '#cbd5e1'
                  }}>
                    {customMainSubtitle || t.mainSubtitle}
                  </p>
                )}
              </div>
            )}

            {/* Column 1: Origins */}
            <div style={{
              position: 'absolute',
              left: '60px',
              top: '0',
              width: `${columnWidth}px`,
              height: '100%',
              zIndex: 2
            }}>
              {showColumnTitles && (
                <div style={{
                  position: 'absolute',
                  top: `${origStartTop - 40}px`,
                  left: 0,
                  width: '100%',
                  textAlign: 'left',
                  borderBottom: bgTheme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)',
                  paddingBottom: '6px'
                }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    color: bgTheme === 'light' || (bgTheme === 'transparent' && cardTheme === 'light') ? '#475569' : '#a5b4fc',
                    textTransform: 'uppercase'
                  }}>
                    {t.origins} ({activeOrigins.length})
                  </span>
                </div>
              )}

              <div style={{
                position: 'absolute',
                top: `${origStartTop}px`,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {activeOrigins.map((item) => (
                  <ConnectionCard
                    key={item.id}
                    title={item.title}
                    icon={item.iconName}
                    brand={item.useBrand}
                    theme={cardTheme}
                  />
                ))}
              </div>
            </div>

            {/* Column 2: Central Hub */}
            <div style={{
              position: 'absolute',
              left: '420px',
              top: '0',
              width: '360px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2
            }}>
              {/* Outer Dashed Ring */}
              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                border: bgTheme === 'light' ? '3px dashed #cbd5e1' : '3px dashed rgba(99, 102, 241, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginTop: '60px'
              }}>
                {/* Inner Glow Circle */}
                <div style={{
                  width: '136px',
                  height: '136px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #07153a 0%, #1e1b4b 100%)',
                  boxShadow: '0 0 35px rgba(99, 102, 241, 0.45)',
                  border: '2px solid rgba(99, 102, 241, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <CrestoneLogo size={54} color1="#66B6FF" color2="#ffffff" />
                </div>
              </div>

              {/* Floating Label Board */}
              <div style={{
                marginTop: '20px',
                backgroundColor: cardTheme === 'dark' ? '#1e293b' : '#ffffff',
                border: cardTheme === 'dark' ? '2px solid #334155' : '2px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                padding: '8px 20px',
                textAlign: 'center',
                width: '220px'
              }}>
                <div style={{
                  fontFamily: "'Poppins', 'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '2.5px',
                  color: cardTheme === 'dark' ? '#ffffff' : '#07153a',
                  marginBottom: '2px'
                }}>
                  CRESTONE
                </div>
                <div style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#94a3b8'
                }}>

                </div>
              </div>
            </div>

            {/* Column 3: Destinations */}
            <div style={{
              position: 'absolute',
              left: '880px',
              top: '0',
              width: `${columnWidth}px`,
              height: '100%',
              zIndex: 2
            }}>
              {showColumnTitles && (
                <div style={{
                  position: 'absolute',
                  top: `${destStartTop - 40}px`,
                  left: 0,
                  width: '100%',
                  textAlign: 'left',
                  borderBottom: bgTheme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)',
                  paddingBottom: '6px'
                }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    color: bgTheme === 'light' || (bgTheme === 'transparent' && cardTheme === 'light') ? '#475569' : '#a5b4fc',
                    textTransform: 'uppercase'
                  }}>
                    {t.destinations} ({activeDestinations.length})
                  </span>
                </div>
              )}

              <div style={{
                position: 'absolute',
                top: `${destStartTop}px`,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {activeDestinations.map((item) => (
                  <ConnectionCard
                    key={item.id}
                    title={item.title}
                    icon={item.iconName}
                    brand={item.useBrand}
                    theme={cardTheme}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Download Diagram Button under the Canvas */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <button
            onClick={downloadPng}
            disabled={isDownloading}
            style={{
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 28px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: isDownloading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            }}
            onMouseEnter={(e) => {
              if (!isDownloading) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isDownloading) {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {isDownloading ? t.downloading : t.downloadDiagram}
          </button>
        </div>

        {/* Individual Assets Export Section */}
        <hr style={{ margin: '48px 0', border: 'none', borderTop: '1px solid var(--ifm-toc-border-color)', opacity: 0.6 }} />

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontWeight: 800, fontSize: '28px', marginBottom: '8px', color: 'var(--ifm-color-content)' }}>
            {t.individualAssetsTitle}
          </h2>
          <p style={{ color: 'var(--ifm-color-gray-medium-dark)', fontSize: '15px', maxWidth: '800px' }}>
            {t.individualAssetsSubtitle}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {/* Origins Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: '20px', color: '#3b82f6' }}>
                {t.origins} ({activeOrigins.length})
              </h3>
              <button
                onClick={() => downloadAllCards(activeOrigins, 'origins')}
                disabled={downloadingCategory !== null}
                style={{
                  background: 'transparent',
                  border: '1px solid #3b82f6',
                  color: '#3b82f6',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: downloadingCategory !== null ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (downloadingCategory === null) {
                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {downloadingCategory === 'origins' ? t.downloading : t.downloadAllOrigins}
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: '24px',
            }}>
              {activeOrigins.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid var(--ifm-toc-border-color)',
                    borderRadius: '12px',
                    backgroundColor: 'var(--ifm-card-background-color)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                  }}
                >
                  {/* Card Export Wrapper */}
                  <div
                    id={`card-export-${item.id}`}
                    style={{
                      padding: '24px',
                      borderRadius: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                      ...getContainerStyle(),
                    }}
                  >
                    <ConnectionCard
                      title={item.title}
                      icon={item.iconName}
                      brand={item.useBrand}
                      theme={cardTheme}
                    />
                  </div>

                  {/* Download Action */}
                  <button
                    onClick={() => downloadSingleCard(item.id, item.title)}
                    disabled={downloadingCardId !== null}
                    style={{
                      backgroundColor: 'var(--ifm-background-color)',
                      border: '1px solid var(--ifm-toc-border-color)',
                      color: 'var(--ifm-color-content)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: downloadingCardId !== null ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      width: '100%',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (downloadingCardId === null) {
                        e.currentTarget.style.borderColor = '#3b82f6';
                        e.currentTarget.style.color = '#3b82f6';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (downloadingCardId === null) {
                        e.currentTarget.style.borderColor = 'var(--ifm-toc-border-color)';
                        e.currentTarget.style.color = 'var(--ifm-color-content)';
                      }
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {downloadingCardId === item.id ? t.exporting : t.exportCard}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Destinations Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: '20px', color: '#6366f1' }}>
                {t.destinations} ({activeDestinations.length})
              </h3>
              <button
                onClick={() => downloadAllCards(activeDestinations, 'destinations')}
                disabled={downloadingCategory !== null}
                style={{
                  background: 'transparent',
                  border: '1px solid #6366f1',
                  color: '#6366f1',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: downloadingCategory !== null ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (downloadingCategory === null) {
                    e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {downloadingCategory === 'destinations' ? t.downloading : t.downloadAllDestinations}
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: '24px',
            }}>
              {activeDestinations.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid var(--ifm-toc-border-color)',
                    borderRadius: '12px',
                    backgroundColor: 'var(--ifm-card-background-color)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                  }}
                >
                  {/* Card Export Wrapper */}
                  <div
                    id={`card-export-${item.id}`}
                    style={{
                      padding: '24px',
                      borderRadius: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                      ...getContainerStyle(),
                    }}
                  >
                    <ConnectionCard
                      title={item.title}
                      icon={item.iconName}
                      brand={item.useBrand}
                      theme={cardTheme}
                    />
                  </div>

                  {/* Download Action */}
                  <button
                    onClick={() => downloadSingleCard(item.id, item.title)}
                    disabled={downloadingCardId !== null}
                    style={{
                      backgroundColor: 'var(--ifm-background-color)',
                      border: '1px solid var(--ifm-toc-border-color)',
                      color: 'var(--ifm-color-content)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: downloadingCardId !== null ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      width: '100%',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (downloadingCardId === null) {
                        e.currentTarget.style.borderColor = '#6366f1';
                        e.currentTarget.style.color = '#6366f1';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (downloadingCardId === null) {
                        e.currentTarget.style.borderColor = 'var(--ifm-toc-border-color)';
                        e.currentTarget.style.color = 'var(--ifm-color-content)';
                      }
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {downloadingCardId === item.id ? t.exporting : t.exportCard}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</Layout>
  );
}
