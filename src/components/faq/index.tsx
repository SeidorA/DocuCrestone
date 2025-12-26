import type {ReactNode} from 'react';
import { useState } from 'react';


const faqs = [
    {
        question: "Are you SAP certified to be a formal extractor?",
        answer: "Certification is not required for the layer we connect to, however, at this time no tool has certification."
    },
    {
        question: "How is the connection to SAP?",
        answer: "It is an RFC or OData connection, and will be through the SAP data logic layer."
    },
    {
        question: "Does it support Z tables or fields?",
        answer: "Yes, it supports Z tables and fields, as well as standard SAP tables and fields."
    },{
        question: "Can Crestone be connected to an in-house orchestrator?",
        answer: "Yes, Crestone has integration through APIs and SDKs."
    },{
        question: "Do you check the data in real time?",
        answer: "Yes, Crestone checks the data in real time, ensuring that the information is always up to date."
    },{
        question: "Does Crestone have a way to identify deltas and only upload the differences in information?",
        answer: "Yes. According to the CDC."
    },{
        question: "Can we place more than one table in a node?",
        answer: "Yes, Crestone has the ability to perform joins. We can also connect to the logical layer and we will already have the SAP joins."
    }
];

function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            {faqs.map((faq, idx) => (
                <div key={idx} style={{ marginBottom: '1rem', borderBottom: '1px solid #eee' }}>
                    <button
                        style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            padding: '0.75rem 0',
                            cursor: 'pointer',
                            
                        }}
                        onClick={() => handleToggle(idx)}
                        aria-expanded={openIndex === idx}
                        aria-controls={`faq-panel-${idx}`}
                        id={`faq-header-${idx}`}
                    >
                        {faq.question}
                    </button>
                    {openIndex === idx && (
                        <div
                            id={`faq-panel-${idx}`}
                            role="region"
                            aria-labelledby={`faq-header-${idx}`}
                            style={{ padding: '0.5rem 0 1rem 0', color: '#444', transition: 'ease all 0.3s', }}
                        >
                            {faq.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default function faq(): ReactNode{
    return(
        <div className="container margin-vert--lg"> 
            <div className="row">
                <div className="col col--5">
                    <h1>Frequently asked questions</h1>
                    <p>Welcome to the FAQ section! We’ve compiled answers to the most common questions so you can find information quickly.</p>
                    <p>If you want to explore all the questions, go to this link. Where you will find all the answers made by the users.</p>
                </div>
                <div className="col">

                    <FAQAccordion />
                </div>
            </div>
        </div>
    )
}