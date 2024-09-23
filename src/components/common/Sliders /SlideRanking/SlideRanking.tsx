import './SlideRanking.css'

export const SlideRanking = ({ posterUrl, itemId, ranking }: { posterUrl: string, itemId: number, ranking: number }) => {

    return (
        <div className="swiper__slide-container">
          <img src={posterUrl} alt={itemId.toString()}/>
          {ranking > 8
              ? (
                  <div className="swiper__slide-ranking-gold space-between-row-center-flex">
                    <span className="swiper__slide-ranking-gold-left-branch"></span>
                    <span className="swiper__slide-ranking-gold-number">{ranking.toFixed(1)}</span>
                    <span className="swiper__slide-ranking-gold-right-branch"></span>
                  </div>
              )
              : (
                  <div className="swiper__slide-ranking-green">{ranking.toFixed(1)}</div>
              )
          }
        </div>
    )
}

