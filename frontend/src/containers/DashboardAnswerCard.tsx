import { Link } from 'react-router-dom';
import { cutSentence } from '../utils/utils';
import { DashboardAnswerData } from './DashboardAnswers';
import dayjs from 'dayjs';

export default function DashboardAnswerCard({ answer }: {answer: DashboardAnswerData}) {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
        <td>
            <Link to={"#"} className="group relative px-4 py-1 text-blue-500 underline">
                {answer?.id}
                <p 
                    className='hidden group-hover:block absolute px-2 py-0.3 bg-gray-800 
                    rounded-sm text-white left-8 text-nowrap'
                >View answer</p>
            </Link>
        </td>
        <th scope="row" className="px-6 py-4">
            {answer.full_name}
        </th>
        <td>
            {answer.email}
        </td>
        <td>
            {dayjs(answer.created_at).format('YYYY.MM.DD')}
        </td>
        <td className='text-center max-w-60'>
            <Link to={`/form/${answer.form_id}/`} className='relative group flex items-center gap-2 text-blue-500 underline'>
                <p>
                    {answer.form_id}
                </p>
                <p>
                    {cutSentence(answer.form_title, 70)}
                </p>
                <p 
                    className='hidden group-hover:block absolute px-2 py-0.3 bg-gray-800 rounded-sm 
                    text-white top-5 left-8 text-nowrap'
                >
                    View form
                </p>
            </Link>
        </td>
    </tr>
  );
}
