import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  createStyles,
  Grid,
  Theme,
  TextField
} from '@material-ui/core'
import axios from 'axios'

const apiKey = {
  key: "1f6329bd390d4432a549f8398086a4f4",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    cardContainer: {
      width: '500px'
    },
    gridContainer: {
      margin: '20px 0px'
    },
    control: {
      margin: theme.spacing(3, 2)
    }
  })
)

const dateData = (d: Date) => {
  const days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "November", "December"]
  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()
  return `${day}, ${date}, ${month}, ${year}`
}

interface IWeatherData {
  name: string,
  temp: number,
  weath: string,
  sys: {
    country: string
  },
  main: {
    temp: number
  }
}

const Weather = () => {
  const [weatherCollection, setWeatherCollection] = React.useState<IWeatherData[]>([])
  const [cityName, setCityName] = React.useState<string>('')
  const [isWeatherReady, weatherReady] = React.useState<boolean>(false)
  const classes = useStyles()

  const handleSearch = (e: any) => {
    if(e.key === "Enter") {
      weatherReady(false)
      axios.get<IWeatherData>(`${apiKey.baseUrl}weather?q=${cityName}&appid=${apiKey.key}`)
        .then(res => {
          const data = res.data
          setWeatherCollection([data, ...weatherCollection])
          weatherReady(true)
          console.log(data)
        })
    }
  }

  return (
    <Grid 
      classes={{ root: classes.gridContainer }}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <TextField 
        label="Search Country" 
        type="search" 
        onChange={e => setCityName(e.target.value)} 
        value={cityName}
        onKeyPress={handleSearch}  
      />
      <Grid container justify="center">
        { weatherCollection.map((weather, index) =>
          <Card key={index} className={classes.cardContainer} classes={{ root: classes.control }} >
            <CardContent>
              <Typography gutterBottom variant="h4">{dateData(new Date())}</Typography>
              <Typography gutterBottom variant="h5">{weather.name}</Typography>
              <Typography>{weather.sys.country}</Typography>
              <Typography>{Math.round(weather.main.temp)}C</Typography>
            </CardContent>
          </Card>)
        }
      </Grid>
    </Grid>
  )
}

export default Weather
