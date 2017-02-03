-- select * from files limit 10
-- select * from metadata limit 10

select 
	files.fullpath,
	metadata.filesize

from files join metadata on files.id = metadata.fileid 
order by metadata.filesize desc 
limit 10

