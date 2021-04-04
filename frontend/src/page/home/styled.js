import styled from 'styled-components'

export const Title = styled.div`
  font-weight: 600;
  padding: 0.2rem;
`

const active = ({active}) =>
  `background-color: ${active ? '#e1e1ff' : '#e1e1e1'}`

export const AppCard = styled.div`
  ${active};

  margin: 1rem;
  padding: 0.4rem;

  border-radius: 0.5rem;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`

export const Label = styled.label`
  padding: 0.2rem;

  input {
    margin-left: 0.2rem;
  }
`
