/* eslint-disable */
import { React, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import './GuestVoting.scss'

import EpButton from '../../UI/EpButton/EpButton'
import EpContainer from '../../UI/EpContainer/EpContainer'
import EpPill from '../../UI/EpPill/EpPill'
import EpLoading from '../../UI/EpLoading/EpLoading'

import EpChart from '../../UI/EpChart/EpChart'
import EpTextInput from '../../UI/EpTextInput/EpTextInput'
import { GuestContext } from '../../../contexts/GuestContext/GuestContext'

export default function GuestVoting() {
  const navigate = useNavigate()
  const { targetPollId } = useParams()
  const Guest = useContext(GuestContext)

  return (
    <div className="guest-voting">
      {Guest.pollId !== targetPollId ? (
        <GuestVotingCreateGuest />
      ) : (
        <GuestVotingBallot />
      )}
    </div>
  )
}

// This is the "Join Poll" form that is displayed with no guest
function GuestVotingCreateGuest({ joinPollAsGuest }) {
  const { targetPollId } = useParams()
  const Guest = useContext(GuestContext)
  const [newGuestName, setNewGuestName] = useState('')
  return (
    <EpContainer narrow centered>
      <EpTextInput
        fullWidth
        label="New guest name"
        onChange={(e) => setNewGuestName(e.target.value)}
        value={newGuestName}
      />
      <EpButton
        onClick={() => {
          Guest.register(newGuestName, targetPollId)
        }}
      >
        Join Poll
      </EpButton>
    </EpContainer>
  )
}

// // this is the "Ballot" form that is displayed when a guest is in the poll
function GuestVotingBallot() {
  const Guest = useContext(GuestContext)
  const [answerTally, setAnswerTally] = useState({})

  useEffect(() => {
    const counting = new Map()
    Guest.answers.map((answer) => {
      answer.answer.forEach((v, i) => {
        if (counting.has(v)) {
          counting.set(v, counting.get(v) + 1)
        } else {
          counting.set(v, 1)
        }
      })
    })
    setAnswerTally({
      labels: Array.from(counting.keys()),
      data: Array.from(counting.values()),
    })
  }, [Guest.answers])

  return (
    <>
      {Guest && Guest.currentQuestion.answerOptions ? (
        <>
          <h1>{Guest.pollData.title}</h1>
          <EpContainer>
            <h1>{Guest.currentQuestion.prompt}</h1>
            {answerTally ? (
              <EpChart
                chartType="pie"
                data={answerTally.data}
                labels={answerTally.labels}
              />
            ) : null}
            <p>
              Voting as{' '}
              <EpPill>
                {Guest.name} - {Guest.id}
              </EpPill>
            </p>
            {Guest.currentQuestion.answerOptions.map((answer, index) => (
              <EpButton
                key={`answerOption-${index}`}
                onClick={() => {
                  Guest.submitAnswer([answer])
                }}
              >
                {answer}
              </EpButton>
            ))}
          </EpContainer>
        </>
      ) : (
        <EpLoading />
      )}
    </>
  )
}
