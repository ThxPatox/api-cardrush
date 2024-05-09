select * from tbl_cartas tc ;
select * from tbl_tipo_habilidad tth ;
select * from tbl_habilidades th ;
select * from tbl_usuarios ;
select * from tbl_razas tr ;
select * from join_habilidades_tipo_habilidad jhth join tbl_habilidades th on jhth.id_habilidad = th.id_habilidad join tbl_tipo_habilidad tth on jhth.id_tipo_habilidad = tth.id_tipo_habilidad ;