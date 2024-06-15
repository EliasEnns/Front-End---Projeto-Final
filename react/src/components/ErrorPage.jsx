
import { useRouteError } from 'react-router-dom'

function ErrorPage() {

    const error = useRouteError()

    return (
      <div>
        <h1>-25 créditos sociais!</h1>
        <p>{error.statusText}</p>
        <p>{error.error.message}</p>
      </div>
    )
  }
  
  export default ErrorPage