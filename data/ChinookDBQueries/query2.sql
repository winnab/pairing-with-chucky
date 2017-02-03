select count(*) from invoiceline
group by trackId order by count(*) desc