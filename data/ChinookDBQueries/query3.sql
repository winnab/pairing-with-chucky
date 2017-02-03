select 
	artist.Name as ArtistName
	, avg(track.Milliseconds * 1.0 / 1000 / 60) as AverageLength /* make floating point before dividing */
	, count(*)
from track
inner join album on track.AlbumId = album.AlbumId
inner join artist on album.ArtistId = artist.ArtistId
group by artist.ArtistId
order by AverageLength desc
