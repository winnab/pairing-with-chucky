select 
	track.Name
	, genre.Name as Genre
	, artist.Name as ArtistName
	, album.Title as AlbumTitle
	, invoiceline.TrackId as InvoiceLine
	, sum(case when invoiceline.TrackId is null then 0 else 1 end) as PurchaseCount
	, count(invoiceline.TrackId) /* equal to sum above */
from track
inner join genre on track.GenreId = genre.GenreId
inner join album on track.AlbumId = album.AlbumId
inner join artist on album.ArtistId = artist.ArtistId
left join invoiceline on track.TrackId = invoiceline.TrackId
group by track.TrackId
