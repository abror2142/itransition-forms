import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie,  faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { cutSentence } from "../../utils/utils";
import { DashboardFormData } from '../../containers/DashboardForms';

export default function DashboardFormCard({ form }: {form: DashboardFormData}) {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
        <td className="px-4 py-1">{form?.id}</td>
        <th scope="row" className="px-6 py-4">
            <p dangerouslySetInnerHTML={{__html: cutSentence(form?.title, 100)}}></p>
        </th>
        <td className="px-4 py-1 max-w-60">
            <p dangerouslySetInnerHTML={{__html: cutSentence(form?.description, 70)}}></p>
        </td>
        <td className="px-4 py-1">
            <p>{form?.topic_name}</p>
        </td>
        <td className="px-6 py-4">
            <p>{form?.type_name}</p>
        </td>
        <td className="px-4 py-1 text-center">
            <Link to={`/form/${form?.id}/edit`}>
                <FontAwesomeIcon icon={faPen} className='text-green-700' />
            </Link>
        </td>
        <td className="px-4 py-1 text-center">
            <Link to={`/dashboard/form/${form?.id}/analytics`}>
                <FontAwesomeIcon icon={faChartPie} className='text-amber-600'/>
            </Link>
         </td>
    </tr>
  );
}
