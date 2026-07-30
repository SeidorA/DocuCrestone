import { ReactNode, useEffect, useRef } from "react";
import { Brand, CaralIcon  } from 'iconcaral2';
import Link from '@docusaurus/Link';
import connectionsData from '../../../static/api/connections.json';

type ConnectionItem = {
    id: string;
    title: string;
    description: string;
    iconName: string;
    useBrand: boolean;
    link: string;
};

const allConnections: ConnectionItem[] = [
    ...connectionsData.origins,
    ...connectionsData.destinations
];

// Duplicate connections to allow seamless infinite scrolling
const duplicatedConnections = [...allConnections, ...allConnections];

interface ConnectionCardProps {
  title: string;
  icon: string;
  brand: boolean;
  theme?: 'light' | 'dark';
}

function ConnectionCard({ title, icon, brand, theme = 'light' }: ConnectionCardProps) {
  const isDark = theme === 'dark';
  return (
    <div style={{
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
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
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = isDark ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0,0,0,0.05)';
    }}
    >
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

export default function Conections(): ReactNode {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isPausedRef = useRef(false);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let animationFrameId: number;
        // 260px width + 16px gap
        const singleSetWidth = allConnections.length * 276; 

        const autoScroll = () => {
            if (!isPausedRef.current) {
                // If we've scrolled past the first full set of connections
                if (container.scrollLeft >= singleSetWidth) {
                    // Reset scroll back to the start seamlessly
                    container.scrollLeft -= singleSetWidth;
                } else {
                    container.scrollLeft += 1; // Scrolling speed (pixels per frame)
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        animationFrameId = requestAnimationFrame(autoScroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return(
        <div style={{ backgroundColor: 'var(--ifm-color-gray-medium)', padding: '2em 0' }}>
            <div className="container">
                <h1 style={{ color: 'var(--ifm-color-gray-carbon)' }} className="margin-bottom--lg">Connections</h1>
            </div>
            {/* Carousel Container */}
            <div 
            ref={scrollRef}
            onMouseEnter={() => isPausedRef.current = true}
            onMouseLeave={() => isPausedRef.current = false}
            style={{ 
                display: 'flex', 
                overflowX: 'auto', 
                gap: '16px', 
                padding: '16px 2em',
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none' /* IE/Edge */
            }}
            className="hide-scrollbar"
            >
                <style>{`
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {duplicatedConnections.map((props, idx) => (
                    <div key={idx} style={{ flexShrink: 0 }}>
                        <Link to={props.link} style={{ textDecoration: 'none' }}>
                            <ConnectionCard 
                                title={props.title}
                                icon={props.iconName}
                                brand={props.useBrand}
                                theme="light"
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}