import Select, { SingleValue } from 'react-select';
import i18n from '../../utils/i18n/i18n';
import uzFlag from '../../assets/uz.png';
import enFlag from '../../assets/en.png';

type SelectOption = SingleValue<{value: string; label: string;}>

const options = [
  { value: 'en', label: <div className='flex items-center gap-1'><img src={enFlag} width="30px"/>EN</div> },
  { value: 'uz', label: <div className='flex items-center gap-1'><img src={uzFlag} width="30px"/>UZ</div> },
]

function LanguageSelect() {

    const handleLanguageChange = (e: SelectOption) => {
        i18n.changeLanguage(e ? e.value : 'en')
    }
    
    return (
        <div>
            <Select
                defaultValue={options[0]}
                options={options}
                onChange={(e) => handleLanguageChange(e) }
            /> 
        </div>
    )
}

export default LanguageSelect;