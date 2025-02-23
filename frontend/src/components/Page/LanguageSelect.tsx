import i18n from '../../utils/i18n/i18n';
import uzFlag from '../../assets/uzFlag.png';
import enFlag from '../../assets/enFlag.png';
import { useEffect, useState } from 'react';


function LanguageSelect() {
    const [lang, setLang] = useState('en');

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang])
    
    return (
        <div className='relative group flex flex-col'>
            <div className='rounded-full dark:hover:bg-dark-card-accent'>
                <img src={lang === 'uz' ? uzFlag : enFlag} className='w-6' />
            </div>
            <div className='hidden group-hover:flex flex-col gap-2 absolute right-0 top-6 bg-dark-bg px-4 py-2 w-max border dark:border-dark-border'>
                <div 
                    className='flex items-center gap-2 border dark:border-dark-border dark:hover:bg-dark-blue px-2 rounded-sm'
                    onClick={() => setLang('en')}
                >
                    <img 
                        src={enFlag} className='w-6'
                    />
                    English
                </div>
                <div
                    onClick={() => setLang('uz')} 
                    className='flex items-center gap-2 border dark:border-dark-border dark:hover:bg-dark-blue px-2 rounded-sm'
                >
                    <img 
                        src={uzFlag} className='w-6'
                    />
                    Uzbek
                </div>
            </div>
        </div>
    )
}

export default LanguageSelect;