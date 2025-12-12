import { useState, useContext, createContext, type ReactNode } from 'react';

type ModalContextType = {
    setModal: (content: ReactNode | undefined) => void;
    content: ReactNode;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode })
{
    const useModal = () => {
        const [content, setContent] = useState<ReactNode>(null);

        const handle = (content: ReactNode) => {
            if (content) {
                document.querySelector('#root')?.classList.add('opacity-50');
                setContent(content);
            } else {
                document.querySelector('#root')?.classList.remove('opacity-50');
                setContent(null);
            }
        };

        return { handle, content };
    };

    const { handle, content } = useModal();

    return (
        <ModalContext value={{
            setModal: handle,
            content: content
        }}>
            {content}
            {children}
        </ModalContext>
    );
}

export function useModal(): ModalContextType
{
    const context = useContext(ModalContext);
    if (!context) throw new Error('useModal must be used within an ModalProvider');
    return context;
}
