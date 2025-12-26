import { Titleicon } from '@site/docs/documentation/cards/cards'


export default function Listarelece({ news, version }) {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignContent: 'center' }}>
                <Titleicon icon='bolt'>
                    <h1 style={{ marginBottom: '0px' }}> All the features of this release</h1>
                </Titleicon>
                <a
                    href={`/pdf/Crestone - Novedades v${version}.pdf`}

                    download
                    style={{
                        display: 'inline-block',
                        padding: '0.75em 1.5em',
                        background: '#07153A',
                        color: '#fff',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        height: 'fit-content'
                    }}
                >
                    Download PDF
                </a>
            </div>

            {news.map((item, idx) => {
                const impg = `/img/relece/${version}/${idx}.png`
                return (
                    <div key={idx} style={{ marginBottom: '2em', borderBottom: '1px solid #eee', padding: '1em' }}>
                        <Titleicon icon={item.icon}>
                            <h2 style={{ marginBottom: '0px' }}>{item.title_slide}</h2>
                        </Titleicon>
                        <p>{item.description}</p>

                        <div style={{ textAlign: "center" }}>
                            <img src={impg} alt={item.title_slide} />
                        </div>
                    </div>
                );
            })}

        </div>
    )
}

