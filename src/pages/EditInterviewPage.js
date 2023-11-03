import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormInputs } from '../hooks/useFormInputs';

export default function EditInterviewPage() {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const { inputs, handleInput, setInputs } = useFormInputs();
  const { getByIndex, add: addClients } = useIndexedDB('clients');
  const { update, getByIndex: getByInterviewsId } = useIndexedDB('interviews');
  const { enqueueSnackbar } = useSnackbar();
  const [valid, setValid] = useState(true);

  useEffect(() => {
    getByInterviewsId('id', +interviewId).then((value) => {
      setInputs({
        name: value.clientInfo.name,
        phone: value.clientInfo.phone,
        nrc: value.clientInfo.nrc,
        address: value.clientInfo.address,
        loan_answer_1: value.loanInfo.quest_1,
        loan_answer_2: value.loanInfo.quest_2,
        loan_answer_3: value.loanInfo.quest_3,
        personal_answer_1: value.personalDetail.quest_1,
        personal_answer_2: value.personalDetail.quest_2,
        personal_answer_3: value.personalDetail.quest_3,
        household_answer_1: value.householdDetail.quest_1,
        household_answer_2: value.householdDetail.quest_2,
        household_answer_3: value.householdDetail.quest_3,
        business_answer_1: value.businessProfile.quest_1,
        business_answer_2: value.businessProfile.quest_2,
        business_answer_3: value.businessProfile.quest_3,
      });
    });
  }, [getByInterviewsId, interviewId, setInputs]);

  const handleCheckInvalid = async () => {
    if (inputs.nrc) {
      const client = await getByIndex('nrc', inputs.nrc);
      const interview = await getByInterviewsId('id', +interviewId);
      if (client && client.nrc !== interview.clientInfo.nrc) {
        setValid(false);
        enqueueSnackbar('The client already exists.', { variant: 'warning' });
      } else {
        setValid(true);
        enqueueSnackbar('The client is valid.', { variant: 'info' });
      }
    }
  };

  const handleSave = () => {};

  return (
    <form className="space-y-16" onSubmit={handleSave}>
      <div className="flex flex-wrap justify-between">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <section className="space-y-6">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Client Info
            </h5>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInput}
                value={inputs.name ?? ''}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={handleInput}
                value={inputs.phone ?? ''}
                placeholder="09xxxxxxxx"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nrc"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                NRC Number
              </label>
              <input
                type="text"
                name="nrc"
                id="nrc"
                onChange={handleInput}
                value={inputs.nrc ?? ''}
                placeholder="1/KaMaTa(N)000032"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <textarea
                name="address"
                id="address"
                placeholder="Address..."
                onChange={handleInput}
                value={inputs.address ?? ''}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
          </section>
        </div>

        {valid && (
          <>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <section className="space-y-6">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Loan Info
                </h5>
                <div>
                  <label
                    htmlFor="loan_answer_1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Question 1
                  </label>
                  <input
                    type="text"
                    name="loan_answer_1"
                    id="loan_answer_1"
                    onChange={handleInput}
                    value={inputs.loan_answer_1 ?? ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Answer 1"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="loan_answer_2"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Question 2
                  </label>
                  <input
                    type="text"
                    name="loan_answer_2"
                    id="loan_answer_2"
                    onChange={handleInput}
                    value={inputs.loan_answer_2 ?? ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Answer 2"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="loan_answer_3"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Question 3
                  </label>
                  <input
                    type="text"
                    name="loan_answer_3"
                    id="loan_answer_3"
                    onChange={handleInput}
                    value={inputs.loan_answer_3 ?? ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Answer 3"
                    required
                  />
                </div>
              </section>
            </div>

            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <section className="space-y-6">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Personal Detail
                </h5>
                <div>
                  <label
                    htmlFor="personal_answer_1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Question 1
                  </label>
                  <input
                    type="text"
                    name="personal_answer_1"
                    id="personal_answer_1"
                    onChange={handleInput}
                    value={inputs.personal_answer_1 ?? ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Answer 1"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="personal_answer_2"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Question 2
                  </label>
                  <input
                    type="text"
                    name="personal_answer_2"
                    id="personal_answer_2"
                    onChange={handleInput}
                    value={inputs.personal_answer_2 ?? ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Answer 2"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="personal_answer_3"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Question 3
                  </label>
                  <input
                    type="text"
                    name="personal_answer_3"
                    id="personal_answer_3"
                    onChange={handleInput}
                    value={inputs.personal_answer_3 ?? ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Answer 3"
                    required
                  />
                </div>
              </section>
            </div>
          </>
        )}
      </div>
      {valid && (
        <div className="flex flex-wrap justify-start space-x-16">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <section className="space-y-6">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Household Detail
              </h5>
              <div>
                <label
                  htmlFor="household_answer_1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Question 1
                </label>
                <input
                  type="text"
                  name="household_answer_1"
                  id="household_answer_1"
                  onChange={handleInput}
                  value={inputs.household_answer_1 ?? ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Answer 1"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="household_answer_2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Question 2
                </label>
                <input
                  type="text"
                  name="household_answer_2"
                  id="household_answer_2"
                  onChange={handleInput}
                  value={inputs.household_answer_2 ?? ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Answer 2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="household_answer_3"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Question 3
                </label>
                <input
                  type="text"
                  name="household_answer_3"
                  id="household_answer_3"
                  onChange={handleInput}
                  value={inputs.household_answer_3 ?? ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Answer 3"
                  required
                />
              </div>
            </section>
          </div>

          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <section className="space-y-6">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Business Profile
              </h5>
              <div>
                <label
                  htmlFor="business_answer_1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Question 1
                </label>
                <input
                  type="text"
                  name="business_answer_1"
                  id="business_answer_1"
                  onChange={handleInput}
                  value={inputs.business_answer_1 ?? ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Answer 1"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="business_answer_2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Question 2
                </label>
                <input
                  type="text"
                  name="business_answer_2"
                  id="business_answer_2"
                  onChange={handleInput}
                  value={inputs.business_answer_2 ?? ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Answer 2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="business_answer_3"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Question 3
                </label>
                <input
                  type="text"
                  name="business_answer_3"
                  id="business_answer_3"
                  onChange={handleInput}
                  value={inputs.business_answer_3 ?? ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Answer 3"
                  required
                />
              </div>
            </section>
          </div>
        </div>
      )}

      <div className="space-x-5">
        <button
          className="px-4 py-2 font-bold uppercase bg-red-500 rounded text-slate-50 hover:bg-red-600 hover:text-slate-100-100"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleCheckInvalid}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Check Valid
        </button>

        {valid && (
          <button
            type="submit"
            className="px-4 py-2 font-bold uppercase rounded bg-slate-400 text-slate-50 hover:bg-slate-500 hover:text-slate-100"
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
}
