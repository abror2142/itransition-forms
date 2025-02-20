import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import dayjs from "dayjs";
import { Link } from 'react-router-dom';

export default function FormDashboardAnswerCard({ answer }) {
  return (
    <div className='bg-white px-3 py-1.5 rounded-md flex gap-2 flex-col justify-between w-full'>
        <div className='flex items-center gap-1 font-medium'>
          <FontAwesomeIcon icon={faFileCircleCheck} className='text-gray-500' />
          {answer?.form_title}
        </div>
        <div className='text-sm flex gap-1 items-center'>
          <p>Author:</p>{answer?.email}
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-1'>
            <p className='text-sm'>
              {dayjs(answer.created_at).format('DD.MM.YYYY')}
            </p>
            <FontAwesomeIcon icon={faCheckCircle}  className='text-green-500'/>
          </div>
          <Link to="#" className='text-blue-600 text-sm font-semibold'>Modify</Link>
        </div>
    </div>
  );
}
