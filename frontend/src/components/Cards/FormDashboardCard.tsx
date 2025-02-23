import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faFileLines, faMask, faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function FormDashboardCard({ form }: {}) {
  return (
    <div className='bg-white px-4 py-2 rounded-md flex gap-2 flex-col justify-between'>
        <div className='flex justify-between items-center'>
            <div className='flex gap-1 items-center'>
                <p>Topic:</p>
                <p>{form?.topic_name}</p>
            </div>
            <div className='flex gap-2 items-center'>
                <FontAwesomeIcon icon={faMask} />
                <p>{form?.type_name}</p>
            </div>
        </div>
        <div>
            <div className='flex items-start gap-2'>
                <FontAwesomeIcon icon={faFileLines}  className='text-lg text-blue-600'/>
                <p>{form?.title}</p>
            </div>
            <p dangerouslySetInnerHTML={{__html: form?.description}}></p>
        </div>
        <div className='flex justify-between items-center text-sm'>
            <button className='flex items-center gap-2 px-3 py-1.5 bg-gray-200 rounded-md'>
                Edit
                <FontAwesomeIcon icon={faPen} className='text-green-700' />
            </button>
            <Link to={`/form/${form?.id}/analytics`} className='flex items-center gap-2 px-3 py-1.5 bg-gray-200 rounded-md'>
                Analytics
                <FontAwesomeIcon icon={faChartPie} className='text-amber-600'/>
            </Link>
        </div>
    </div>
  );
}
